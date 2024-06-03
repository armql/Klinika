using Klinika.Server.Models.Data;
using Klinika.Server.Models.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;

namespace Klinika.Server.Controllers
{
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
                query = query.Where(s => s.id.Contains(search) || s.Specialization.name.Contains(search) || s.User.UserName.Contains(search));
            }

            var count = query.Count();

            var specializedDoctors = query.Skip((pageNumber - 1) * pageSize).Take(pageSize).AsEnumerable();
            
            return Ok(new
            {
                data = specializedDoctors,
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
