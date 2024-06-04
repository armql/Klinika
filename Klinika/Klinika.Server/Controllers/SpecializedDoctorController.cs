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
    public class SpecializedDoctorController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        
        public SpecializedDoctorController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        
        [HttpGet("getAll")]
        public async Task<ActionResult<IEnumerable<object>>> GetAll()
        {
            var specializedDoctors = await _dbContext.SpecializedDoctors
                .Include(s => s.Specialization)
                .Include(s => s.Reservations)
                .Select(s => new
                {
                    s.id,
                    s.specializationId,
                    specializationName = s.Specialization.name,
                    fullName = s.User.firstName + " " + s.User.lastName,
                    Reservations = s.Reservations
                        .GroupBy(r => r.date)
                        .Select(g => new 
                        {
                            date = g.Key,
                            slots = g.Select(r => r.slot).ToList()
                        })
                        .ToList()
                })
                .ToListAsync();

            if (specializedDoctors == null)
            {
                return NotFound();
            }

            return Ok(specializedDoctors);
        }
        
        [HttpGet("getOverview")]
        public async Task<ActionResult> GetPatientsBySpecializedDoctorId(string id)
        {
            var reservations = await _dbContext.Reservations
                .Include(r => r.patient)
                .ThenInclude(p => p.User)
                .Where(r => r.specializedDoctorId == id)
                .ToListAsync();

            var patients = reservations
                .GroupBy(r => r.patientId)
                .Select(g => new 
                {
                    fullName = g.First().patient.User.firstName + " " + g.First().patient.User.lastName,
                    reservationsCount = g.Count()
                })
                .ToList();

            var result = new
            {
                patientsCount = patients.Count,
                totalReservationsCount = reservations.Count,
                patients
            };

            return Ok(result);
        }
        
        [HttpGet("getReservationsWithoutConsultation")]
        public async Task<ActionResult> GetReservationsWithoutConsultation(string id)
        {
            string currentDate = DateTime.UtcNow.ToString("MM/dd/yyyy");
            
            currentDate = currentDate.Replace('.', '/');
            
            Console.WriteLine("Current date: " + currentDate);

            var reservations = await _dbContext.Reservations
                .Include(r => r.patient)
                .ThenInclude(p => p.User)
                .Where(r => r.specializedDoctorId == id && r.Consultations.Count == 0 && r.date == currentDate)
                .Select(r => new
                {
                    id = r.id,
                    patientFullName = r.patient.User.firstName + " " + r.patient.User.lastName,
                    reasonOfConsultation = r.reasonOfConsultation,
                    date = r.date,
                    slot = r.slot
                })
                .ToListAsync();

            return Ok(reservations);
        }
        
        [HttpGet("paginate")]
        public ActionResult<IEnumerable<SpecializedDoctor>> Paginate(string search = "", int pageNumber = 1, int pageSize = 15)
        {
            if (_dbContext.SpecializedDoctors == null)
            {
                return NotFound();
            }

            var query = _dbContext.SpecializedDoctors.AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                switch (search)
                {
                    case "_byLowId":
                        query = query.OrderBy(s => s.id);
                        break;
                    case "_byHighId":
                        query = query.OrderByDescending(s => s.id);
                        break;
                    case "_byAsc":
                        query = query.OrderBy(s => s.User.firstName);
                        break;
                    case "_byDesc":
                        query = query.OrderByDescending(s => s.User.firstName);
                        break;
                    default:
                        query = query.Where(s => s.id.Contains(search) || s.Specialization.name.Contains(search) || s.User.UserName.Contains(search));
                        break;
                }
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
        public async Task<ActionResult<SpecializedDoctor>> Create(SpecializedDoctor specializedDoctor)
        {
            if (specializedDoctor == null)
            {
                return BadRequest();
            }
            
            _dbContext.SpecializedDoctors.Add(specializedDoctor);
            await _dbContext.SaveChangesAsync();
            return Ok(specializedDoctor);
        }
        
        [HttpGet("get")]
        public async Task<ActionResult<SpecializedDoctor>> Get(string id)
        {
            if (_dbContext.SpecializedDoctors == null)
            {
                return NotFound();
            }
            
            var specializedDoctor = await _dbContext.SpecializedDoctors.FirstOrDefaultAsync(s => s.id == id);
            
            if (specializedDoctor == null)
            {
                return NotFound();
            }

            return Ok(specializedDoctor);
        }
        
        [HttpPatch("update/{id}")]
        public async Task<ActionResult<SpecializedDoctor>> Update(string id, [FromBody] JsonPatchDocument<SpecializedDoctor> patchDoc)
        {
            if (patchDoc == null)
            {
                return BadRequest(ModelState);
            }
            
            var specializedDoctor = await _dbContext.SpecializedDoctors.FirstOrDefaultAsync(s => s.id == id);
            
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
            
            return Ok(new {message = "Specialized doctor with the id " + specializedDoctor.id + " was updated."});
        }
        
        [HttpDelete("delete")]
        public async Task<ActionResult> Delete(string id)
        {
            if (_dbContext.SpecializedDoctors == null)
            {
                return NotFound();
            }
            
            var specializedDoctor = await _dbContext.SpecializedDoctors.FirstOrDefaultAsync(s => s.id == id);
            
            if (specializedDoctor == null)
            {
                return NotFound();
            }
            
            _dbContext.SpecializedDoctors.Remove(specializedDoctor);
            await _dbContext.SaveChangesAsync();
            
            return Ok(new {message = "Specialized doctor with the id " + specializedDoctor.id + " was deleted."});
        }
        
        [HttpDelete("bulkDelete")]
        public async Task<ActionResult> BulkDelete([FromBody] List<string> ids)
        {
            var specializedDoctorsToDelete = await _dbContext.SpecializedDoctors.Where(s => ids.Contains(s.id)).ToListAsync();
            
            
            if (specializedDoctorsToDelete.Count == 0 || specializedDoctorsToDelete == null)
            {
                return NotFound();
            }
            
            _dbContext.SpecializedDoctors.RemoveRange(specializedDoctorsToDelete);
            await _dbContext.SaveChangesAsync();
            
            return Ok(new { message = "SpecializationDoctors were successfully deleted." });
        } 
    }
}
