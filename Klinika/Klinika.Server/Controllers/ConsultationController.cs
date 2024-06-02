using Klinika.Server.Models;
using Klinika.Server.Models.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;

namespace Klinika.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConsultationController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        
        public ConsultationController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        
        [HttpGet("paginateById")]
        public ActionResult<IEnumerable<Consultation>> PaginateById(string userId, string search = "", int pageNumber = 1, int pageSize = 15)
        {
            if (_dbContext.Consultations == null)
            {
                return NotFound();
            }

            var query = _dbContext.Consultations.Include(c => c.reservation).Where(c => c.reservation.patientId == userId).AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(s => s.notes.Contains(search) || s.evaluation.Contains(search));
            }

            var count = query.Count();

            var consultations = query.Skip((pageNumber - 1) * pageSize).Take(pageSize).AsEnumerable();

            return Ok(new
            {
                data = consultations,
                pageNumber,
                pageSize,
                totalCount = count,
                totalPages = (int)Math.Ceiling(count / (double)pageSize)
            });
        }
        
        [HttpGet("getAll")]
        public async Task<ActionResult<IEnumerable<Consultation>>> GetAll()
        {
            var consultations = await _dbContext.Consultations.ToListAsync();
            if (consultations == null)
            {
                return NotFound();
            }

            return Ok(consultations);
        }
        
        [HttpGet("paginate")]
        public ActionResult<IEnumerable<Consultation>> Paginate(string search = "", int pageNumber = 1, int pageSize = 15)
        {
            if (_dbContext.Consultations == null)
            {
                return NotFound();
            }

            var query = _dbContext.Consultations.AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(s => s.notes.Contains(search) || s.evaluation.Contains(search));
            }

            var count = query.Count();

            var consultations = query.Skip((pageNumber - 1) * pageSize).Take(pageSize).AsEnumerable();
            return Ok(new
            {
                data = consultations,
                pageNumber,
                pageSize,
                totalCount = count,
                totalPages = (int)Math.Ceiling(count / (double)pageSize)
            });
        }
        
        [HttpPost("create")]
        public async Task<ActionResult<Consultation>> Create(Consultation consultation)
        {
            if (consultation == null)
            {
                return BadRequest();
            }
            
            var newConsultation = new Consultation()
            {
                notes = consultation.notes,
                evaluation = consultation.evaluation,
                creationDate = DateTime.Now,
                reservationId = consultation.reservationId
            };

            _dbContext.Consultations.Add(newConsultation);
            await _dbContext.SaveChangesAsync();
            return Ok(consultation);
        }
        
        [HttpGet("get")]
        public async Task<ActionResult<Consultation>> Get(int id)
        {
            if (_dbContext.Consultations == null)
            {
                return NotFound();
            }

            var consultation = await _dbContext.Consultations.FirstOrDefaultAsync(c => c.id == id);
            
            if (consultation == null)
            {
                return NotFound();
            }

            return Ok(consultation);
        }
        
        [HttpPatch("update/{id}")]
        public async Task<ActionResult<Consultation>> Update(int id, [FromBody] JsonPatchDocument<Consultation> patchDoc)
        {
            if (patchDoc != null)
            {
                if (_dbContext.Consultations == null)
                {
                    return NotFound();
                }

                var consultation = await _dbContext.Consultations.FirstOrDefaultAsync(c => c.id == id);
            
                if (consultation == null)
                {
                    return BadRequest();
                }

                patchDoc.ApplyTo(consultation, ModelState);
            
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
            
                await _dbContext.SaveChangesAsync();
                return Ok(consultation);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }
        
        [HttpDelete("delete")]
        public async Task<ActionResult> Delete(int id)
        {
            if (_dbContext.Consultations == null)
            {
                return NotFound();
            }

            var consultation = await _dbContext.Consultations.FirstOrDefaultAsync(c => c.id == id);
            
            if (consultation == null)
            {
                return NotFound();
            }

            _dbContext.Consultations.Remove(consultation);
            await _dbContext.SaveChangesAsync();
            return Ok(new { message = "Consultation with the id " + consultation.id + " was deleted." });
            
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
            
            var consultationsToDelete = await _dbContext.Consultations.Where(c => intIds.Contains(c.id)).ToListAsync();
            
            if(consultationsToDelete == null || consultationsToDelete.Count == 0)
            {
                return NotFound(new { message = "No consultations found." });
            }
            
            _dbContext.Consultations.RemoveRange(consultationsToDelete);
            await _dbContext.SaveChangesAsync();
            
            return Ok(new { message = "Consultations were successfully deleted." });
        }
    }
}
