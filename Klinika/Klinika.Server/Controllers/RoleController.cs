using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Klinika.Server.Models;
using Klinika.Server.Models.Data;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Klinika.Server.Models.DTO.Developer;
using Microsoft.AspNetCore.JsonPatch;

namespace Klinika.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly RoleManager<IdentityRole> _roleManager;

        public RoleController(ApplicationDbContext dbContext, RoleManager<IdentityRole> roleManager)
        {
            _dbContext = dbContext;
            _roleManager = roleManager;
        }

        [HttpGet("getAll")]
        public ActionResult<IEnumerable<Role>> GetAll(string search = "", int pageNumber = 1, int pageSize = 15)
        {
            if (_dbContext.Roles == null)
            {
                return NotFound();
            }

            var query = _dbContext.Roles.AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(s => s.Name.Contains(search) || s.NormalizedName.Contains(search));
            }

            var count = query.Count();

            var roles = query.Skip((pageNumber - 1) * pageSize).Take(pageSize).AsEnumerable();

            return Ok(new
            {
                data = roles,
                pageNumber,
                pageSize,
                totalCount = count,
                totalPages = (int)Math.Ceiling(count / (double)pageSize)
            });
        }

        [HttpPost("create")]
        public async Task<ActionResult> Create([FromBody] IdentityDto identityDto)
        {
            if (identityDto != null && _roleManager.RoleExistsAsync(identityDto.Name).GetAwaiter().GetResult())
            {
                return Conflict(new { message = "Resource already exists!"});
            }

            _roleManager.CreateAsync(new IdentityRole(identityDto.Name)).GetAwaiter().GetResult();

            return Ok(new { message = "Role with name " + identityDto.Name + " has been created." });
        }

        [HttpGet("get")]
        public async Task<ActionResult<IdentityRole>> Get(string Id)
        {
            if (_roleManager.Roles == null)
            {
                return NotFound();
            }

            var role = await _roleManager.FindByIdAsync(Id);

            if (role == null)
            {
                return NotFound();
            }

            return role;
        }

        [HttpPatch("update/{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] JsonPatchDocument<IdentityRole> patchDoc)
        {
            if (patchDoc != null)
            {
                var role = await _roleManager.FindByIdAsync(id);

                if (role == null)
                {
                    return BadRequest();
                }

                patchDoc.ApplyTo(role, ModelState);

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var result = await _roleManager.UpdateAsync(role);

                if (!result.Succeeded)
                {
                    return BadRequest();
                }

                return Ok(new { message = "Role with name " + role.Name + " has been updated." });
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpPost("seed-roles")]
        public async Task<IActionResult> SeedRoles()
        {
            string[] roleNames = {
                ApplicationStaticUserRoles.DEVELOPER,
                ApplicationStaticUserRoles.ADMINISTRATOR,
                ApplicationStaticUserRoles.PATIENT,
                ApplicationStaticUserRoles.PRIMARYDOC,
                ApplicationStaticUserRoles.SPECDOC
            };

            bool allRolesExist = true;

            foreach (string roleName in roleNames)
            {
                bool roleExists = await _roleManager.RoleExistsAsync(roleName);

                if (!roleExists)
                {
                    await _roleManager.CreateAsync(new IdentityRole(roleName));
                    allRolesExist = false;
                }
            }

            if (allRolesExist)
            {
                return Ok("Role seeding is already done successfully!");
            }

            return Ok("Role seeding done successfully!");
        }

        [HttpDelete("delete")]
        public async Task<ActionResult> Delete(string Id)
        {
            if (_roleManager.Roles == null)
            {
                return NotFound();
            }

            var role = await _roleManager.FindByIdAsync(Id);

            if (role == null)
            {
                return NotFound();
            }

            var result = await _roleManager.DeleteAsync(role);

            if (!result.Succeeded)
            {
                return BadRequest();
            }

            return Ok(new { message = Id + " was removed" });
        }
    }
}
