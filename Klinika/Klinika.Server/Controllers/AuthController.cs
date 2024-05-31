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
using Microsoft.AspNetCore.Http.HttpResults;
using NuGet.Common;

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

        [HttpPost("refreshTokenMethod")]
        public async Task<ActionResult<LoginResponse>> RefreshTokeno(RefreshTokenModel model)
        {
            var response = new LoginResponse();
            
            var principal = GetTokenPrincipal(model.jwtToken);

            // Check if the model is valid
            if (model == null || string.IsNullOrEmpty(model.jwtToken) || string.IsNullOrEmpty(model.refreshToken))
            {
                Console.WriteLine("Invalid client request");
                return BadRequest(response + " Invalid client request");
            }
            
            if (principal == null)
            {
                Console.WriteLine("Invalid token1" + model.jwtToken);
                return BadRequest(response + model.jwtToken + " Invalid token");
            }
            

            var user = await _userManager.FindByEmailAsync(principal.EmailAddress);
            if (user == null)
            {
                Console.WriteLine("User not found");
                return BadRequest(response + " User not found");
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


        [HttpPost("getTokenPrincipal")]
        public TokenPayloadDTO GetTokenPrincipal(string jwtToken)
        {
            try
            {
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("JWT:Secret").Value));
                
                var tokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateActor = false,
                    ValidIssuer = _configuration["JWT:ValidIssuer"],
                    ValidAudience = _configuration["JWT:ValidAudience"],
                    IssuerSigningKey = securityKey,
                    ValidateLifetime = false
                };

                var principal = new JwtSecurityTokenHandler().ValidateToken(jwtToken, tokenValidationParameters, out var securityToken);
                var jwtSecurityToken = securityToken as JwtSecurityToken;
                
                if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                {
                    return new TokenPayloadDTO();
                }
                
                if (principal != null)
                {
                    var payload = new TokenPayloadDTO()
                    {
                        EmailAddress = principal.Claims.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress")?.Value,
                        NameIdentifier = principal.Claims.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value,
                        JwtId = principal.Claims.FirstOrDefault(c => c.Type == "JWTID")?.Value,
                        Role = principal.Claims.FirstOrDefault(c => c.Type == "http://schemas.microsoft.com/ws/2008/06/identity/claims/role")?.Value,
                        Expiration = long.Parse(principal.Claims.FirstOrDefault(c => c.Type == "exp")?.Value),
                        Issuer = principal.Claims.FirstOrDefault(c => c.Type == "iss")?.Value,
                        Audience = principal.Claims.FirstOrDefault(c => c.Type == "aud")?.Value,
                    };

                    return payload;
                }

                return new TokenPayloadDTO();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
                return new TokenPayloadDTO();
            }
        }


        [HttpPost("refreshToken")]
        public async Task<ActionResult> RefreshToken(RefreshTokenModel model)
        {
            try
            {
                if (model == null)
                {
                    // Log the null model error
                    return BadRequest("Model is null");
                }

                var actionResult = await RefreshTokeno(model);

                if (actionResult == null)
                {
                    // Log the null actionResult error
                    return BadRequest("Action result is null");
                }

                if (actionResult.Result is OkObjectResult okResult)
                {
                    var loginResponse = okResult.Value as LoginResponse;

                    if (loginResponse == null)
                    {
                        // Log the null loginResponse error
                        return BadRequest("Login response is null");
                    }

                    if (loginResponse.isLoggedIn)
                    {
                        return Ok(loginResponse);
                    }

                    return Unauthorized(model);
                }

                // Handle other possible results (BadRequest, Unauthorized, etc.)
                if (actionResult.Result is BadRequestObjectResult badRequestResult)
                {
                    return BadRequest(badRequestResult.Value);
                }

                return Unauthorized(model);
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("logout"), Authorize]
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
    }
}
