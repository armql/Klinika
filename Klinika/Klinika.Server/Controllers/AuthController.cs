using Klinika.Server.Models;
using Klinika.Server.Models.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Klinika.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(SignInManager<ApplicationUser> sm, UserManager<ApplicationUser> um) : ControllerBase
    {
        private readonly SignInManager<ApplicationUser> _signInManager = sm;
        private readonly UserManager<ApplicationUser> _userManager = um;

        public string HashPassword(string password)
        {
            var hasher = new PasswordHasher<object>();
            string hashedPassword = hasher.HashPassword(null, password);
            return hashedPassword;
        }

        public bool VerifyPassword(string hashedPassword, string providedPassword)
        {
            var hasher = new PasswordHasher<object>();
            var result = hasher.VerifyHashedPassword(null, hashedPassword, providedPassword);
            return result == PasswordVerificationResult.Success;
        }

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
                    PasswordHash = hashedPassword
                };
                result = await _userManager.CreateAsync(newUser);

                if (!result.Succeeded)
                {
                    return BadRequest(result);
                }

                message = "Registered Successfully.";
            }
            catch (Exception ex)
            {
                return BadRequest("Something went wrong please try again." + ex.Message);
            }

            return Ok(new { message = message, result = result });
        }

        [HttpPost("login")]
        public async Task<ActionResult> LoginUser(Login login)
        {
            string message = "";

            try
            {
                ApplicationUser user = await _userManager.FindByEmailAsync(login.Email);

                var result = await _signInManager.PasswordSignInAsync(user, login.Password, login.RememberMe, false);

                if (!result.Succeeded)
                {
                    return Unauthorized("Check your login credentials and try again.");
                }

                message = "Login Successful.";
            }
            catch (Exception ex)
            {
                return BadRequest("Something went wrong please try again." + ex.Message);
            }

            return Ok(new { message = message});
        }

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

            return Ok(new {partners = partners});
        }
    }
}
