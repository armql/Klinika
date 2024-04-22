using Klinika.Server.Models;
using Klinika.Server.Models.Data;
using Klinika.Server.Models.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Klinika.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, ApplicationDbContext dbContext) : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager = userManager;
        private readonly RoleManager<IdentityRole> _roleManager = roleManager;
        private readonly ApplicationDbContext _dbContext = dbContext;


        [HttpGet("getAll")]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> GetAll()
        {
            if (_userManager.Users == null)
            {
                return NotFound();
            }

            return await _userManager.Users.ToListAsync();
        }

        [HttpGet("get")]
        public async Task<ActionResult<ApplicationUser>> Get(string id)
        {
            if (_userManager.Users == null)
            {
                return NotFound();
            }

            var user = await _userManager.Users.FirstOrDefaultAsync(s => s.Id == id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }


        [HttpPost("create")]
        public async Task<ActionResult> RegisterUser(ApplicationUser userRequest)
        {
            string message = "";
            IdentityResult result = new();

            try
            {
                var hashedPassword = HashPassword(userRequest.password);

                ApplicationUser newUser = new ApplicationUser()
                {
                    firstName = userRequest.firstName,
                    lastName = userRequest.lastName,
                    birthDate = userRequest.birthDate,
                    gender = userRequest.gender.ToLower(),
                    Email = userRequest.Email.ToLower(),
                    UserName = userRequest.Email,
                    PasswordHash = hashedPassword
                };
                result = await _userManager.CreateAsync(newUser);

                if (!result.Succeeded)
                {
                    return BadRequest(result);
                }

                Patient newPatient = new Patient()
                {
                    id = newUser.Id,
                };

                await _dbContext.Patients.AddAsync(newPatient);
                await _dbContext.SaveChangesAsync();

                message = "Created Successfully.";
            }
            catch (Exception ex)
            {
                return BadRequest("Something went wrong please try again." + ex.Message);
            }

            return Ok(new { message = message, result = result });
        }

        //[HttpPost("update")]
        //public async Task<ActionResult> UpdateUser(ApplicationUser userRequest)
        //{
        //    string message = "";
        //    IdentityResult result = new();

        //    var user = await _userManager.FindByIdAsync(userRequest.Id);

        //    if(user == null)
        //    {
        //        return NotFound();
        //    }

        //    try
        //    {
        //        var hashedPassword = HashPassword(user.password);

        //        ApplicationUser newUser = new ApplicationUser()
        //        {
        //            firstName = user.firstName,
        //            lastName = user.lastName,
        //            birthDate = user.birthDate,
        //            gender = user.gender.ToLower(),
        //            Email = user.Email.ToLower(),
        //        };

        //        result = await _userManager.UpdateAsync(newUser);

        //        if (!result.Succeeded)
        //        {
        //            return BadRequest(result);
        //        }

        //        message = "Updated Successfully.";
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest("Something went wrong please try again." + ex.Message);
        //    }

        //    return Ok(new { message = message, result = result });
        //}

        [HttpPatch("update/{id}")]
        public async Task<IActionResult> UpdateUser(string id, [FromBody] JsonPatchDocument<ApplicationUser> patchDoc)
        {
            if (patchDoc != null)
            {
                var user = await _userManager.FindByIdAsync(id);

                if (user == null)
                {
                    return NotFound();
                }

                patchDoc.ApplyTo(user, ModelState);

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var result = await _userManager.UpdateAsync(user);

                if (!result.Succeeded)
                {
                    return BadRequest(result);
                }

                return Ok(new { message = "User with the id: " + user.Id + " was updated." });
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpDelete("delete")]
        public async Task<ActionResult> Delete(string id)
        {
            string message = "";
            IdentityResult result = new();

            try
            {
                if (_userManager.Users == null)
                {
                    return NotFound();
                }

                var user = await _userManager.FindByIdAsync(id);

                result = await _userManager.DeleteAsync(user);

                message = "Deleted Successfully.";
            }
            catch (Exception ex)
            {
                return BadRequest("Something went wrong please try again." + ex.Message);
            }

            return Ok(new { message = message, result = result });
        }


        [HttpPost("assignRole")]
        public async Task<ActionResult> AssignRole(string id, string roleName)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return BadRequest();
            }

            var roleExists = await _roleManager.RoleExistsAsync(roleName);

            if (!roleExists)
            {
                await _roleManager.CreateAsync(new IdentityRole(roleName));
            }

            await _userManager.AddToRoleAsync(user, roleName);
            return Ok("Success");
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
    }
}
