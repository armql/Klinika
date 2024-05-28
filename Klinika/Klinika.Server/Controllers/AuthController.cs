using Klinika.Server.Models;
using Klinika.Server.Models.Data;
using Klinika.Server.Models.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Klinika.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(SignInManager<ApplicationUser> sm, UserManager<ApplicationUser> um, ApplicationDbContext dbContext, IConfiguration configuration, RoleController roleController, RoleManager<IdentityRole> rm) : ControllerBase
    {
        private readonly SignInManager<ApplicationUser> _signInManager = sm;
        private readonly UserManager<ApplicationUser> _userManager = um;
        private readonly RoleManager<IdentityRole> _roleManager = rm;
        private readonly ApplicationDbContext _dbContext = dbContext;
        private readonly IConfiguration _configuration = configuration;
        private readonly RoleController _roleController = roleController;

        [HttpPost("register")]
        public async Task<ActionResult> RegisterUser(ApplicationUser user)
        {
            string message = "";
            IdentityResult result = new();

            try
            {
                var hashedPassword = HashPassword(user.password);

                ApplicationUser newUser = new ApplicationUser()
                {
                    firstName = user.firstName,
                    lastName = user.lastName,
                    birthDate = user.birthDate,
                    gender = user.gender,
                    Email = user.Email,
                    UserName = user.Email,
                    PasswordHash = hashedPassword,
                    SecurityStamp = Guid.NewGuid().ToString(),
                };
                result = await _userManager.CreateAsync(newUser);


                var roleExists = await _roleManager.RoleExistsAsync(ApplicationStaticUserRoles.PATIENT);
                if (!roleExists)
                {
                    await _roleController.SeedRoles();
                }

                if (!result.Succeeded)
                {
                    return BadRequest(result);
                }

                Patient newPatient = new Patient()
                {
                    id = newUser.Id,
                };

                
                await _userManager.AddToRoleAsync(newUser, ApplicationStaticUserRoles.PATIENT);

                //Add to table of patients
                await _dbContext.Patients.AddAsync(newPatient);
                await _dbContext.SaveChangesAsync();

                message = "Registered Successfully.";
            }
            catch (Exception ex)
            {
                return BadRequest("Something went wrong please try again." + ex.Message);
            }

            return Ok(new { message = message, result = result });
        }

        //[HttpPost("login")]
        //public async Task<ActionResult> LoginUser(Login login)
        //{
        //    string message = "";

        //    try
        //    {
        //        ApplicationUser user = await _userManager.FindByEmailAsync(login.Email);

        //        var result = await _signInManager.PasswordSignInAsync(user, login.Password, login.RememberMe, false);

        //        if (!result.Succeeded)
        //        {
        //            return Unauthorized("Check your login credentials and try again.");
        //        }

        //        var userRoles = await _userManager.GetRolesAsync(user);

        //        var authClaims = new List<Claim>
        //        {
        //            new Claim(ClaimTypes.Email, user.Email),
        //            new Claim(ClaimTypes.NameIdentifier, user.Id),
        //            new Claim("JWTID", Guid.NewGuid().ToString()),
        //        };

        //        foreach (var userRole in userRoles)
        //        {
        //            authClaims.Add(new Claim(ClaimTypes.Role, userRole));
        //        }

        //        var token = GenerateNewJsonWebToken(authClaims);

        //        message = "Login Successful.";
        //        return Ok(token);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest("Something went wrong please try again." + ex.Message);
        //    }

        //    return Ok(new { message = message });
        //}

        [HttpPost("login")]
        public async Task<ActionResult> LoginUser(Login login)
        {
            try
            {
                ApplicationUser user = await _userManager.FindByEmailAsync(login.Email);
                var response = new LoginResponse();

                if (user == null)
                {
                    return BadRequest(new { error = "The email address you entered does not correspond to any account. Please check and try again." });
                }

                var result = await _signInManager.PasswordSignInAsync(user, login.Password, login.RememberMe, false);

                if (result.IsLockedOut)
                {
                    return Unauthorized(new { error = "Your account is locked. Please contact support for assistance." });
                }

                if (result.IsNotAllowed)
                {
                    return Unauthorized(new { error = "You are not allowed to sign in. Please contact support if you believe this is an error." });
                }

                if (!result.Succeeded)
                {
                    return Unauthorized(new { error = "The password you entered is incorrect. Please check and try again." });
                }

                var userRoles = await _userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.NameIdentifier, user.Id),
                    new Claim("JWTID", Guid.NewGuid().ToString()),
                };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }

                response.jwtToken = GenerateNewJsonWebToken(authClaims);
                response.refreshToken = GenerateRefreshToken();
                response.isLoggedIn = true;
                
                user.refreshToken = response.refreshToken;
                user.refreshTokenExpiryTime = DateTime.Now.AddDays(30);
                await _userManager.UpdateAsync(user);

                return Ok(response);
            }
            catch (Exception ex)
            {
                // Log the detailed error message for debugging
                Console.WriteLine(ex);
                return BadRequest(new { error = "An unexpected error occurred. Please try again later." });
            }
        }
        
        [HttpPost("refreshToken")]
        public async Task<ActionResult> RefreshTokens(RefreshTokenModel model)
        {
            var loginResponse = await RefreshToken(model);
            if (loginResponse.isLoggedIn)
            {
                return Ok(loginResponse);
            }
            return Unauthorized();
        }
        
        /*
         [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<ApplicationUser>> GetCurrent()
        {
            // Get the user's ID from the User property
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            // Get the user's email from the User property
            string email = User.FindFirstValue(ClaimTypes.Email);

            // Use the UserManager to get the ApplicationUser object
            ApplicationUser currentUser = await _userManager.FindByIdAsync(userId);

            if (currentUser == null)
            {
                return NotFound();
            }

            return currentUser;
        }
         */

        [HttpGet("logout"), Authorize]
        public async Task<ActionResult> LogoutUser()
        {
            string message = "You are free to go!";

            try
            {
                await _signInManager.SignOutAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok(new { message = message });
        }

        [HttpGet("admin"), Authorize]
        public ActionResult AdminPage()
        {
            string[] partners = { "Test1", "Test2" };

            return Ok(new { partners = partners });
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        public string HashPassword(string password)
        {
            var hasher = new PasswordHasher<object>();
            string hashedPassword = hasher.HashPassword(null, password);
            return hashedPassword;
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        public bool VerifyPassword(string hashedPassword, string providedPassword)
        {
            var hasher = new PasswordHasher<object>();
            var result = hasher.VerifyHashedPassword(null, hashedPassword, providedPassword);
            return result == PasswordVerificationResult.Success;
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        private string GenerateNewJsonWebToken(List<Claim> claims)
        {
            var authSecret = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var tokenObject = new JwtSecurityToken(
                    issuer: _configuration["JWT:ValidIssuer"],
                    audience: _configuration["JWT:ValidAudience"],
                    expires: DateTime.Now.AddHours(1),
                    claims: claims,
                    signingCredentials: new SigningCredentials(authSecret, SecurityAlgorithms.HmacSha256)
                );

            string token = new JwtSecurityTokenHandler().WriteToken(tokenObject);

            return token;
        }
        
        [ApiExplorerSettings(IgnoreApi = true)]
        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[64];

            using (var numberGenerator = RandomNumberGenerator.Create())
            {
                numberGenerator.GetBytes(randomNumber);
            }

            return Convert.ToBase64String(randomNumber);
        }
        
        [ApiExplorerSettings(IgnoreApi = true)]
        public async Task<LoginResponse> RefreshToken(RefreshTokenModel model)
        {
            var principal = GetTokenPrincipal(model.jwtToken);

            var response = new LoginResponse();

            if (principal?.Identity?.Name is null)
            {
                return response;
            }

            var user = await _userManager.FindByEmailAsync(principal.Identity.Name);
            
            if (user is null || user.refreshToken != model.refreshToken || user.refreshTokenExpiryTime < DateTime.Now)
            {
                return response;
            }

            var userRoles = await _userManager.GetRolesAsync(user);

            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim("JWTID", Guid.NewGuid().ToString()),
            };

            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }
            
            response.jwtToken = GenerateNewJsonWebToken(authClaims);
            response.refreshToken = GenerateRefreshToken();
            response.isLoggedIn = true;
                
            user.refreshToken = response.refreshToken;
            user.refreshTokenExpiryTime = DateTime.Now.AddDays(30);
            await _userManager.UpdateAsync(user);

            return response;
        }
        
        [ApiExplorerSettings(IgnoreApi = true)]
        private ClaimsPrincipal? GetTokenPrincipal(string token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidIssuer = _configuration["JWT:ValidIssuer"],
                ValidAudience = _configuration["JWT:ValidAudience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"])),
                ValidateLifetime = false
            };

            return new JwtSecurityTokenHandler().ValidateToken(token, tokenValidationParameters, out _);
        }
    }
}
