using Klinika.Server.Models;
using Klinika.Server.Models.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Klinika.Server.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class SatelliteController(ApplicationDbContext dbContext) : Controller
{
    
    [Authorize(Roles = "DEVELOPER")]
    [HttpGet("getAll")]
        public async Task<ActionResult<IEnumerable<Satellite>>> GetAll()
        {
            var satellites = await dbContext.Satellites.Where(s => !s.IsDeleted).ToListAsync();
            // var satellites = await dbContext.Satellites.ToListAsync();
            if (satellites == null)
            {
                return NotFound();
            }

            return satellites;
        }

        [HttpGet("paginate")]
        public async Task<ActionResult<IEnumerable<Satellite>>> Paginate(string search = "", int pageNumber = 1, int pageSize = 15)
        {
            if (dbContext.Satellites == null)
            {
                return NotFound();
            }

            // var query = dbContext.Satellites.AsQueryable();
            var query = dbContext.Satellites.Where(s => !s.IsDeleted).AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                switch (search)
                {
                    case "_byLowId":
                        query = query.OrderBy(b => b.Id);
                        break;
                    case "_byHighId":
                        query = query.OrderByDescending(b => b.Id);
                        break;
                    case "_byAsc":
                        query = query.OrderBy(b => b.Name);
                        break;
                    case "_byDesc":
                        query = query.OrderByDescending(b => b.Name);
                        break;
                    default:
                        query = query.Where(b => b.Name.Contains(search));
                        break;
                }
            }

            var count = await query.CountAsync();

            var satellites = await query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();

            return Ok(new
            {
                data = satellites,
                pageNumber,
                pageSize,
                totalCount = count,
                totalPages = (int)Math.Ceiling(count / (double)pageSize)
            });
        }

        [Authorize(Roles = "DEVELOPER")]
        [HttpPost("create")]
        public async Task<ActionResult> Create(Satellite request)
        {
            var newBlock= new Satellite()
            {
                Name = request.Name,
                PlanetId = request.PlanetId,
            };

            await dbContext.Satellites.AddAsync(newBlock);
            await dbContext.SaveChangesAsync();

            return Ok(new { message = newBlock.Id + ", with the name: " + newBlock.Name + " was created." });
        }

        [Authorize(Roles = "DEVELOPER")]
        [HttpGet("get")]
        public async Task<ActionResult<Satellite>> Get(int id)
        {
            if (dbContext.Satellites == null)
            {
                return NotFound();
            }

            var satellite = await dbContext.Satellites.FirstOrDefaultAsync(s => s.Id == id);

            if (satellite == null)
            {
                return NotFound();
            }

            return satellite;
        }

        [Authorize(Roles = "DEVELOPER")]
        [HttpPatch("update/{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] JsonPatchDocument<Satellite> patchDoc)
        {
            if (patchDoc != null)
            {
                var satellite = await dbContext.Satellites.FindAsync(id);

                if (satellite == null)
                {
                    return BadRequest();
                }

                patchDoc.ApplyTo(satellite, ModelState); ;

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                await dbContext.SaveChangesAsync();

                return Ok(new { message = "Satellites with the id: " + satellite.Id + " was updated." });
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [Authorize(Roles = "DEVELOPER")]
        [HttpDelete("delete")]
        public async Task<ActionResult> Delete(int id)
        {
            if (dbContext.Satellites == null)
            {
                return NotFound();
            }

            var satellite = await dbContext.Satellites.FindAsync(id);

            if (satellite == null)
            {
                return NotFound();
            }

            dbContext.Satellites.Remove(satellite);
            await dbContext.SaveChangesAsync();
            return Ok(new { message = satellite.Name + " was removed" });
        }
        
        [Authorize(Roles = "DEVELOPER")]
        [HttpDelete("delete-soft")]
        public async Task<ActionResult> SoftDelete(int id)
        {
            var satellite = await dbContext.Satellites.FindAsync(id);

            if (satellite == null)
            {
                return NotFound();
            }

            satellite.IsDeleted = true;
            await dbContext.SaveChangesAsync();

            return Ok(new { message = satellite.Name + " was removed" });
        }
        
        [Authorize(Roles = "DEVELOPER")]
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
            
            var consultationsToDelete = await dbContext.Satellites.Where(c => intIds.Contains(c.Id)).ToListAsync();
            
            if(consultationsToDelete == null || consultationsToDelete.Count == 0)
            {
                return NotFound(new { message = "No satellites found." });
            }
            
            dbContext.Satellites.RemoveRange(consultationsToDelete);
            await dbContext.SaveChangesAsync();
            
            return Ok(new { message = "Satellites were successfully deleted." });
        }
    
}