using Klinika.Server.Models;
using Klinika.Server.Models.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Klinika.Server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceDeskController(ApplicationDbContext dbContext) : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext = dbContext;

        [HttpGet("getAll")]
        public async Task<ActionResult<IEnumerable<ServiceDesk>>> GetAll()
        {
            var serviceDesks = await _dbContext.ServiceDesks.ToListAsync();
            if (serviceDesks == null)
            {
                return NotFound();
            }

            return serviceDesks;
        }
        
        [HttpGet("paginate")]
        public ActionResult<IEnumerable<ServiceDesk>> Paginate(string search = "", int pageNumber = 1, int pageSize = 15)
        {
            if (_dbContext.ServiceDesks == null)
            {
                return NotFound();
            }

            var query = _dbContext.ServiceDesks.AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(s => s.name.Contains(search) || s.operatingHours.Contains(search));
            }

            var count = query.Count();

            var services = query.Skip((pageNumber - 1) * pageSize).Take(pageSize).AsEnumerable();

            return Ok(new
            {
                data = services,
                pageNumber,
                pageSize,
                totalCount = count,
                totalPages = (int)Math.Ceiling(count / (double)pageSize)
            });
        }


        //[Authorize]
        [HttpPost("create")]
        public async Task<ActionResult> Create(ServiceDesk userRequest)
        {
            var newServiceDesk = new ServiceDesk()
            {
                name = userRequest.name,
                email = userRequest.email,
                operatingHours = userRequest.operatingHours,
                blockId = userRequest.blockId,
            };

            await _dbContext.ServiceDesks.AddAsync(newServiceDesk);
            await _dbContext.SaveChangesAsync();

            return Ok(new { message = newServiceDesk.id + ", with the name: " + newServiceDesk.name + " was created." });
        }

        [HttpGet("get")]
        public async Task<ActionResult<ServiceDesk>> Get(int id)
        {
            if (_dbContext.ServiceDesks == null)
            {
                return NotFound();
            }

            var serviceDesk = await _dbContext.ServiceDesks.FirstOrDefaultAsync(s => s.id == id);

            if (serviceDesk == null)
            {
                return NotFound();
            }

            return serviceDesk;
        }

        [HttpPatch("update/{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] JsonPatchDocument<ServiceDesk> patchDoc)
        {
            if (patchDoc != null)
            {
                var serviceDesk = await _dbContext.ServiceDesks.FindAsync(id);

                if (serviceDesk == null)
                {
                    return BadRequest();
                }

                patchDoc.ApplyTo(serviceDesk, ModelState);

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                await _dbContext.SaveChangesAsync();

                return Ok(new { message = "ServiceDesk with the id: " + serviceDesk.id + " was updated." });
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpDelete("delete")]
        public async Task<ActionResult> Delete(int id)
        {
            if (_dbContext.ServiceDesks == null)
            {
                return NotFound();
            }

            var serviceDesk = await _dbContext.ServiceDesks.FindAsync(id);

            if (serviceDesk == null)
            {
                return NotFound();
            }

            _dbContext.ServiceDesks.Remove(serviceDesk);
            await _dbContext.SaveChangesAsync();
            return Ok(new { message = serviceDesk.name + " was removed" });
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

            var specializationsToDelete = await _dbContext.ServiceDesks.Where(s => intIds.Contains(s.id)).ToListAsync();

            if (specializationsToDelete == null || specializationsToDelete.Count == 0)
            {
                return NotFound(new { message = "No specializations found with the provided IDs." });
            }

            _dbContext.ServiceDesks.RemoveRange(specializationsToDelete);
            await _dbContext.SaveChangesAsync();

            return Ok(new { message = "Specializations were successfully deleted." });
        }
    }
}
