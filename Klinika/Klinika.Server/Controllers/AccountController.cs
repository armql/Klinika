using Klinika.Server.Models;
using Klinika.Server.Models.Data;
using Klinika.Server.Models.DTO.Developer;
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

        [HttpGet("count")]
        public async Task<ActionResult<int>> CountUsers()
        {
            var count = await _userManager.Users.CountAsync();
            return Ok(count);
        }
        
        [HttpGet("paginate")]
        public ActionResult<IEnumerable<ApplicationUser>> Paginate(string search = "", int pageNumber = 1, int pageSize = 15)
        {
            if (_dbContext.Users == null)
            {
                return NotFound();
            }

            var query = _dbContext.Users.AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(s => s.Email.Contains(search) || s.firstName.Contains(search) || s.lastName.Contains(search) || s.PhoneNumber.Contains(search));
            }

            var count = query.Count();

            var services = query.Skip((pageNumber - 1) * pageSize).Take(pageSize).AsEnumerable();

            return Ok(new
            {
                data = services,
                pageNumber,
                pageSize,
                totalCount = count,
                totalPages = (int)Math.Ceiling(count / (double)pageSize)
            });
        }

        [HttpGet("getAll")]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> GetAll()
        {
            if (_userManager.Users == null)
            {
                return NotFound();
            }

            var users = await _userManager.Users.ToListAsync();

            if (users == null)
            {
                return NotFound();
            }

            return users;
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
