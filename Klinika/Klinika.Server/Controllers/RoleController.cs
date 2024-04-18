using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Klinika.Server.Models;
using Klinika.Server.Models.Data;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Klinika.Server.Models.DTO;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

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
        public async Task<ActionResult<IEnumerable<IdentityRole>>> GetAll()
        {
            if (_roleManager.Roles == null)
            {
                return NotFound();
            }

            return await _roleManager.Roles.ToListAsync();
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

        [HttpPost("update")]
        public async Task<ActionResult> Update(Role userRequest)
        {
            var roleId = userRequest.Id;

            var role = await _roleManager.FindByIdAsync(roleId);

            if (role == null)
            {
                return BadRequest();
            }

            role.Name = userRequest.Name;
            var result = await _roleManager.UpdateAsync(role);

            if(!result.Succeeded)
            {
                return BadRequest();
            }

            return Ok(new { message = "Role with name " + userRequest.Name + " has been updated." });
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
