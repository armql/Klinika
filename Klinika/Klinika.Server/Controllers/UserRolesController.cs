using Klinika.Server.Models.Data;
using Klinika.Server.Models.DTO.Developer;
using Klinika.Server.Models.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Klinika.Server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserRolesController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, ApplicationDbContext dbContext, RoleController roleController) : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager = userManager;
        private readonly RoleManager<IdentityRole> _roleManager = roleManager;
        private readonly ApplicationDbContext _dbContext = dbContext;
        private readonly RoleController _roleController = roleController;
        
        
        [HttpGet("paginate")]
        public async Task<ActionResult<IEnumerable<UserWithRoleDto>>> GetAll(string search = "", int pageNumber = 1, int pageSize = 15)
        {
            if (_dbContext.UserRoles == null)
            {
                return NotFound();
            }

            var usersWithRole = new List<UserWithRoleDto>();

            var roles = _roleManager.Roles.ToList();
            foreach (var role in roles)
            {
                var usersInRole = await _userManager.GetUsersInRoleAsync(role.Name);
                foreach (var user in usersInRole)
                {
                    var dto = new UserWithRoleDto
                    {
                        id = user.Id,
                        email = user.Email,
                        roleName = role.Name
                    };
                    usersWithRole.Add(dto);
                }
            }

            var query = usersWithRole.AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(s => s.email.Contains(search) || s.roleName.Contains(search) || s.id.Contains(search));
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
        
        [HttpGet("get")]
        public async Task<ActionResult<UserWithRoleDto>> Get(string id)
        {
            if (_userManager.Users == null)
            {
                return NotFound();
            }

            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            var role = await _userManager.GetRolesAsync(user);
            var userDto = new UserWithRoleDto
            {
                id = user.Id,
                email = user.Email,
                roleName = role.FirstOrDefault().ToString(),
            };

            return userDto;
        }


        [HttpPost("create")]
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
                await _roleController.SeedRoles();
            }

            roleExists = await _roleManager.RoleExistsAsync(roleName);
            if (!roleExists)
            {
                return BadRequest("Role does not exist and seeding failed.");
            }

            var userRoles = await _userManager.GetRolesAsync(user);
            if (userRoles.Any())
            {
                await _userManager.RemoveFromRolesAsync(user, userRoles);
            }

            await _userManager.AddToRoleAsync(user, roleName);
            return Ok("Success");
        }


        [HttpPatch("update/{id}")]
        public async Task<IActionResult> UpdateRole(string id, [FromBody] JsonPatchDocument<ApplicationUser> patchDoc)
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
    }
}
