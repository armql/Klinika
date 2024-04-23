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
    public class SpecializationController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly UserManager<ApplicationUser> _userManager;

        public SpecializationController(ApplicationDbContext dbContext, UserManager<ApplicationUser> userManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;
        }

        [HttpGet("getAll")]
        public ActionResult<IEnumerable<Specialization>> GetAll(string search = "", int pageNumber = 1, int pageSize = 15)
        {
            if (_dbContext.Specializations == null)
            {
                return NotFound();
            }

            var query = _dbContext.Specializations.AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(s => s.name.Contains(search) || s.createdBy.Contains(search));
            }

            var count = query.Count();

            var specializations = query.Skip((pageNumber - 1) * pageSize).Take(pageSize).AsEnumerable();

            return Ok(new
            {
                data = specializations,
                pageNumber,
                pageSize,
                totalCount = count,
                totalPages = (int)Math.Ceiling(count / (double)pageSize)
            });
        }

        [Authorize]
        [HttpPost("create")]
        public async Task<ActionResult> Create([FromBody] SpecializationDto specializationDto)
        {
            var currentUser = await _userManager.GetUserAsync(User);

            if (currentUser == null)
            {
                return Unauthorized(new { message = "User is not authenticated" });
            }

            var newSpecialization = new Specialization()
            {
                name = specializationDto.name,
                createdBy = currentUser.firstName,
                creationDate = DateTime.Now,
            };

            await _dbContext.Specializations.AddAsync(newSpecialization);
            await _dbContext.SaveChangesAsync();

            return Ok(new { message = newSpecialization.id + ", with the name:" + newSpecialization.name + " was created." });
        }

        [HttpGet("get")]
        public async Task<ActionResult<Specialization>> Get(int id)
        {
            if(_dbContext.Specializations == null)
            {
                return NotFound();
            }

            var specialization = await _dbContext.Specializations.FirstOrDefaultAsync(s => s.id == id);

            if(specialization == null)
            {
                return NotFound();
            }

            return specialization;
        }

        [HttpPatch("update/{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] JsonPatchDocument<Specialization> patchDoc)
        {
            if (patchDoc != null)
            {
                var specialization = await _dbContext.Specializations.FindAsync(id);

                if (specialization == null)
                {
                    return BadRequest();
                }

                patchDoc.ApplyTo(specialization, ModelState);

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                await _dbContext.SaveChangesAsync();

                return Ok(new { message = "Specialization with the id " + specialization.id + " was updated." });
            }
            else
            {
                return BadRequest(ModelState);
            }
        }


        [HttpDelete("delete")]
        public async Task<ActionResult> Delete(int id)
        {
            if (_dbContext.Specializations == null)
            {
                return NotFound();
            }

            var specialization = await _dbContext.Specializations.FindAsync(id);

            if(specialization == null)
            {
                return NotFound();
            }

            _dbContext.Specializations.Remove(specialization);
            await _dbContext.SaveChangesAsync();
            return Ok(new { message = specialization.name + " was removed" });
        }
    }
}
