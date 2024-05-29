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
using System.Security.Claims;


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
        public async Task<ActionResult<IEnumerable<Specialization>>> GetAll()
        {
            var specializations = await _dbContext.Specializations.ToListAsync();
            if (specializations == null)
            {
                return NotFound();
            }

            return specializations;
        }
        
        [HttpGet("paginate")]
        public ActionResult<IEnumerable<Specialization>> Paginate(string search = "", int pageNumber = 1, int pageSize = 15)
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
        private async Task<ApplicationUser> GetCurrentUserAsync()
        {
            var claims = User.Claims;
            string userId = User.FindFirstValue("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier");

            // Log all claims for debugging
            foreach (var claim in claims)
            {
                Console.WriteLine($"Claim Type: {claim.Type}, Claim Value: {claim.Value}");
            }

            if (string.IsNullOrEmpty(userId))
            {
                return null;
            }

            return await _userManager.FindByIdAsync(userId);
        }
        
        
        [ApiExplorerSettings(IgnoreApi = true)]
        public async Task<ApplicationUser> GetCurrent()
        {
            if (Request.Headers.ContainsKey("Authorization"))
            {
                var authHeader = Request.Headers["Authorization"].ToString();
                Console.WriteLine(authHeader);
            }
            else
            {
                Console.WriteLine("Authorization header is missing");
            }
            
            string nameIdentifier = User.Claims.FirstOrDefault(c =>
                c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;

            // Use the UserManager to get the ApplicationUser object
            ApplicationUser currentUser = await _userManager.FindByIdAsync(nameIdentifier);

            if (currentUser == null)
            {
                return null;
            }

            return currentUser;
        }
        
        
        [HttpPost("create")]
        public async Task<ActionResult> Create([FromBody] SpecializationDto specializationDto)
        {
            var currentUser = await GetCurrent();

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
        
        [HttpDelete("bulkDelete")]
        public async Task<ActionResult> BulkDelete([FromBody] List<string> ids)
        {
            var intIds = new List<int>();

            foreach (var id in ids)
            {
                if (int.TryParse(id, out var intId))
                {
                    intIds.Add(intId);
                }
                else
                {
                    return BadRequest(new { message = $"ID '{id}' is not a valid integer." });
                }
            }

            var specializationsToDelete = await _dbContext.Specializations.Where(s => intIds.Contains(s.id)).ToListAsync();

            if (specializationsToDelete == null || specializationsToDelete.Count == 0)
            {
                return NotFound(new { message = "No specializations found with the provided IDs." });
            }

            _dbContext.Specializations.RemoveRange(specializationsToDelete);
            await _dbContext.SaveChangesAsync();

            return Ok(new { message = "Specializations were successfully deleted." });
        }


    }
}
