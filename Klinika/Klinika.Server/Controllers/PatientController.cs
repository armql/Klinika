using Klinika.Server.Models.Data;
using Klinika.Server.Models.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Klinika.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        
        public PatientController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        
        [HttpGet("getAll")]
        public async Task<ActionResult<IEnumerable<Patient>>> GetAll()
        {
            var patients = await _dbContext.Patients.ToListAsync();
            if (patients == null)
            {
                return NotFound();
            }

            return Ok(patients);
        }

        [HttpGet("paginate")]
        public ActionResult<IEnumerable<Patient>> Paginate(string search = "", int pageNumber = 1, int pageSize = 15)
        {
            if (_dbContext.Patients == null)
            {
                return NotFound();
            }

            var query = _dbContext.Patients.AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(s => s.id.Contains(search) || s.User.UserName.Contains(search));
            }

            var count = query.Count();

            var patients = query.Skip((pageNumber - 1) * pageSize).Take(pageSize).AsEnumerable();

            return Ok(new
            {
                data = patients,
                pageNumber,
                pageSize,
                totalCount = count,
                totalPages = (int)Math.Ceiling(count / (double)pageSize)
            });
        }
        
        [HttpPost("create")]
        public async Task<ActionResult<Patient>> Create(Patient patient)
        {
            if (patient == null)
            {
                return BadRequest();
            }

            await _dbContext.Patients.AddAsync(patient);
            await _dbContext.SaveChangesAsync();

            return Ok(new {message="Patient created successfully", patient});
        }
        
        [HttpGet("get")]
        public async Task<ActionResult<Patient>> Get(string id)
        {
            if(_dbContext.Patients == null)
            {
                return NotFound();
            }
            
            var patient = await _dbContext.Patients.FirstOrDefaultAsync(s => s.id == id);
            
            if (patient == null)
            {
                return NotFound();
            }

            return Ok(patient);
        }
        
        [HttpPatch("update/{id}")]
        public async Task<ActionResult<Patient>> Update(string id, [FromBody] JsonPatchDocument<Patient> patchDoc)
        {
            if(patchDoc == null)
            {
                return BadRequest(ModelState);
            }

            var patient = await _dbContext.Patients.FirstOrDefaultAsync(s => s.id == id);
            
            if (patient == null)
            {
                return BadRequest();
            }
            
            patchDoc.ApplyTo(patient, ModelState);
            
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            await _dbContext.SaveChangesAsync();
            
            return Ok(new {message="Patient updated successfully", patient});
        }
        
        [HttpDelete("delete")]
        public async Task<ActionResult> Delete(string id)
        {
            if (_dbContext.Patients == null)
            {
                return NotFound();
            }
            
            var patient = await _dbContext.Patients.FirstOrDefaultAsync(s => s.id == id);
            
            if (patient == null)
            {
                return NotFound();
            }
            
            _dbContext.Patients.Remove(patient);
            await _dbContext.SaveChangesAsync();
            
            return Ok(new {message="Patient deleted successfully"});
        }
        
        [HttpDelete("bulkDelete")]
        public async Task<ActionResult> BulkDelete(List<string> ids)
        {
            if (_dbContext.Patients == null)
            {
                return NotFound();
            }
            
            var patients = await _dbContext.Patients.Where(s => ids.Contains(s.id)).ToListAsync();
            
            if (patients.Count == 0 || patients == null)
            {
                return NotFound();
            }
            
            _dbContext.Patients.RemoveRange(patients);
            await _dbContext.SaveChangesAsync();
            
            return Ok(new {message="Patients deleted successfully"});
        }
    }
}
