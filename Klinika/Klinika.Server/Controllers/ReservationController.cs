using Klinika.Server.Models;
using Klinika.Server.Models.Data;
using Klinika.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.DotNet.Scaffolding.Shared.ProjectModel;
using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;

namespace Klinika.Server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly FeeServices _feeServices;

        public ReservationController(ApplicationDbContext dbContext, FeeServices feeServices)
        {
            _dbContext = dbContext;
            _feeServices = feeServices;
        }

        [HttpGet("getAll")]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetAll()
        {
            var reservations = await _dbContext.Reservations.ToListAsync();
            if (reservations == null)
            {
                return NotFound();
            }

            return Ok(reservations);
        }

        [HttpGet("paginate")]
        public ActionResult<IEnumerable<Reservation>> Paginate(string search = "", int pageNumber = 1, int pageSize = 15)
        {
            if (_dbContext.Reservations == null)
            {
                return NotFound();
            }

            var query = _dbContext.Reservations.AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                switch (search)
                {
                    case "_byLowId":
                        query = query.OrderBy(r => r.id);
                        break;
                    case "_byHighId":
                        query = query.OrderByDescending(r => r.id);
                        break;
                    case "_byAsc":
                        query = query.OrderBy(r => r.reasonOfConsultation);
                        break;
                    case "_byDesc":
                        query = query.OrderByDescending(r => r.reasonOfConsultation);
                        break;
                    default:
                        query = query.Where(r => r.reasonOfConsultation.Contains(search) || r.date.Contains(search));
                        break;
                }
            }

            var count = query.Count();

            var reservations = query.Skip((pageNumber - 1) * pageSize).Take(pageSize).AsEnumerable();

            return Ok(new
            {
                data = reservations,
                pageNumber,
                pageSize,
                totalCount = count,
                totalPages = (int)Math.Ceiling(count / (double)pageSize)
            });
        }

        [HttpPost("create")]
        public async Task<ActionResult<Reservation>> Create(Reservation reservation)
        {
            if (reservation == null)
            {
                return BadRequest();
            }

            var newReservation = new Reservation()
            {
                reasonOfConsultation = reservation.reasonOfConsultation,
                date = reservation.date,
                slot = reservation.slot,
                creationDate = DateTime.Now,
                specializedDoctorId = reservation.specializedDoctorId,
                patientId = reservation.patientId
            };
            
            await _dbContext.Reservations.AddAsync(newReservation);
            await _dbContext.SaveChangesAsync();

            return Ok(reservation);
        }
        
        [HttpGet("paginateById")]
        public ActionResult<IEnumerable<Reservation>> PaginateById(string userId, string search = "", int pageNumber = 1, int pageSize = 15)
        {
            if (_dbContext.Reservations == null)
            {
                return NotFound();
            }

            var query = _dbContext.Reservations
                .Include(r => r.specializedDoctor)
                .ThenInclude(sd => sd.Specialization)
                .Where(r => r.patientId == userId)
                .Select(r => new
                {
                    r.id,
                    r.reasonOfConsultation,
                    r.date,
                    r.slot,
                    r.creationDate,
                    specializedDoctorName = r.specializedDoctor.User.firstName + " " + r.specializedDoctor.User.lastName,
                    specializationName = r.specializedDoctor.Specialization.name
                })
                .AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(s => s.reasonOfConsultation.Contains(search) || s.slot == int.Parse(search));
            }

            var count = query.Count();

            var reservations = query.Skip((pageNumber - 1) * pageSize).Take(pageSize).AsEnumerable();

            return Ok(new
            {
                data = reservations,
                pageNumber,
                pageSize,
                totalCount = count,
                totalPages = (int)Math.Ceiling(count / (double)pageSize)
            });
        }

        [HttpGet("get")]
        public async Task<ActionResult<Reservation>> Get(int id)
        {
            if (_dbContext.Reservations == null)
            {
                return NotFound();
            }

            var reservation = await _dbContext.Reservations.FirstOrDefaultAsync(r => r.id == id);
            if (reservation == null)
            {
                return NotFound();
            }

            return Ok(reservation);
        }

        [HttpPatch("update/{id}")]
        public async Task<ActionResult<Reservation>> Update(int id, JsonPatchDocument<Reservation> patchDoc)
        {
            if (patchDoc != null)
            {
                var reservation = await _dbContext.Reservations.FirstOrDefaultAsync(r => r.id == id);

                if (reservation == null)
                {
                    return NotFound();
                }

                patchDoc.ApplyTo(reservation, ModelState);

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                await _dbContext.SaveChangesAsync();

                return Ok(new { message = "Reservation with the id " + reservation.id + " was updated." });
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpDelete("delete")]
        public async Task<ActionResult> Delete(int id)
        {
            if (_dbContext.Reservations == null)
            {
                return NotFound();
            }

            var reservation = await _dbContext.Reservations.FirstOrDefaultAsync(r => r.id == id);

            if (reservation == null)
            {
                return NotFound();
            }

            _dbContext.Reservations.Remove(reservation);
            await _dbContext.SaveChangesAsync();
            return Ok(new { message = "Reservation with the id " + reservation.id + " was deleted." });
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

            var reservationsToDelete = await _dbContext.Reservations.Where(r => intIds.Contains(r.id)).ToListAsync();

            if (reservationsToDelete == null || reservationsToDelete.Count == 0)
            {
                return NotFound(new { message = "No reservations found with the provided IDs." });
            }

            _dbContext.Reservations.RemoveRange(reservationsToDelete);
            await _dbContext.SaveChangesAsync();

            return Ok(new { message = "Reservations were successfully deleted." });
        }
    }
}
