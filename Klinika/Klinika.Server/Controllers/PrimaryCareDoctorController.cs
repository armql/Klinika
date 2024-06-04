using Klinika.Server.Models.Data;
using Klinika.Server.Models.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;

namespace Klinika.Server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PrimaryCareDoctorController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        
        public PrimaryCareDoctorController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        
        [HttpGet("getAll")]
        public async Task<ActionResult<IEnumerable<PrimaryCareDoctor>>> GetAll()
        {
            var specializations = await _dbContext.PrimaryCareDoctors.ToListAsync();
            if (specializations == null)
            {
                return NotFound();
            }

            return specializations;
        }
        
        [HttpGet("paginate")]
        public ActionResult<IEnumerable<PrimaryCareDoctor>> Paginate(string search = "", int pageNumber = 1, int pageSize = 15)
        {
            if (_dbContext.PrimaryCareDoctors == null)
            {
                return NotFound();
            }

            var query = _dbContext.PrimaryCareDoctors.AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                switch (search)
                {
                    case "_byLowId":
                        query = query.OrderBy(p => p.id);
                        break;
                    case "_byHighId":
                        query = query.OrderByDescending(p => p.id);
                        break;
                    case "_byAsc":
                        query = query.OrderBy(p => p.User.firstName);
                        break;
                    case "_byDesc":
                        query = query.OrderByDescending(p => p.User.firstName);
                        break;
                    default:
                        query = query.Where(p => p.User.firstName.Contains(search) || p.User.lastName.Contains(search));
                        break;
                }
            }

            var count = query.Count();

            var primaryCareDoctors = query.Skip((pageNumber - 1) * pageSize).Take(pageSize).AsEnumerable();

            return Ok(new
            {
                data = primaryCareDoctors,
                pageNumber,
                pageSize,
                totalCount = count,
                totalPages = (int)Math.Ceiling(count / (double)pageSize)
            });
        }
        
        [HttpPost("create")]
        public async Task<ActionResult<PrimaryCareDoctor>> Create(PrimaryCareDoctor specializedDoctor)
        {
            if (specializedDoctor == null)
            {
                return BadRequest();
            }
            
            _dbContext.PrimaryCareDoctors.Add(specializedDoctor);
            await _dbContext.SaveChangesAsync();
            return Ok(specializedDoctor);
        }
        
        [HttpGet("get")]
        public async Task<ActionResult<PrimaryCareDoctor>> Get(string id)
        {
            if (_dbContext.PrimaryCareDoctors == null)
            {
                return NotFound();
            }
            
            var specializedDoctor = await _dbContext.PrimaryCareDoctors.FirstOrDefaultAsync(s => s.id == id);
            
            if (specializedDoctor == null)
            {
                return NotFound();
            }

            return Ok(specializedDoctor);
        }
        
        [HttpPatch("update/{id}")]
        public async Task<ActionResult<PrimaryCareDoctor>> Update(string id, [FromBody] JsonPatchDocument<PrimaryCareDoctor> patchDoc)
        {
            if (patchDoc == null)
            {
                return BadRequest(ModelState);
            }
            
            var specializedDoctor = await _dbContext.PrimaryCareDoctors.FirstOrDefaultAsync(s => s.id == id);
            
            if (specializedDoctor == null)
            {
                return BadRequest();
            }
            
            patchDoc.ApplyTo(specializedDoctor, ModelState);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _dbContext.SaveChangesAsync();
            
            return Ok(new {message = "Primary doctor with the id " + specializedDoctor.id + " was updated."});
        }
        
        [HttpDelete("delete")]
        public async Task<ActionResult> Delete(string id)
        {
            if (_dbContext.PrimaryCareDoctors == null)
            {
                return NotFound();
            }
            
            var specializedDoctor = await _dbContext.PrimaryCareDoctors.FirstOrDefaultAsync(s => s.id == id);
            
            if (specializedDoctor == null)
            {
                return NotFound();
            }
            
            _dbContext.PrimaryCareDoctors.Remove(specializedDoctor);
            await _dbContext.SaveChangesAsync();
            
            return Ok(new {message = "Primary doctor with the id " + specializedDoctor.id + " was deleted."});
        }
        
        [HttpDelete("bulkDelete")]
        public async Task<ActionResult> BulkDelete([FromBody] List<string> ids)
        {
            var specializedDoctorsToDelete = await _dbContext.PrimaryCareDoctors.Where(s => ids.Contains(s.id)).ToListAsync();
            
            
            if (specializedDoctorsToDelete.Count == 0 || specializedDoctorsToDelete == null)
            {
                return NotFound();
            }
            
            _dbContext.PrimaryCareDoctors.RemoveRange(specializedDoctorsToDelete);
            await _dbContext.SaveChangesAsync();
            
            return Ok(new { message = "SpecializationDoctors were successfully deleted." });
        } 
    }
}
