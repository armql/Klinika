using Klinika.Server.Models;
using Klinika.Server.Models.Data;
using Klinika.Server.Models.DTO.Developer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Klinika.Server.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class PlanetController(ApplicationDbContext dbContext) : ControllerBase
{
    [Authorize(Roles = "DEVELOPER")]
    [HttpGet("getAll")]
    public async Task<ActionResult<IEnumerable<Planet>>> GetAll()
    {
        // var planets = await dbContext.Planets.ToListAsync();
        var planets = await dbContext.Planets.Where(s => !s.IsDeleted).ToListAsync();
        if (planets == null)
        {
            return NotFound();
        }

        return planets;
    }

    [Authorize(Roles = "DEVELOPER")]
    [HttpGet("paginate")]
    public ActionResult<IEnumerable<Planet>> Paginate(string search = "", int pageNumber = 1, int pageSize = 15)
    {
        if (dbContext.Planets == null)
        {
            return NotFound();
        }

        var query = dbContext.Planets.Where(s => !s.IsDeleted).AsQueryable();

        if (!string.IsNullOrEmpty(search))
        {
            switch (search)
            {
                case "_byLowId":
                    query = query.OrderBy(s => s.Id);
                    break;
                case "_byHighId":
                    query = query.OrderByDescending(s => s.Id);
                    break;
                case "_byAsc":
                    query = query.OrderBy(s => s.Name);
                    break;
                case "_byDesc":
                    query = query.OrderByDescending(s => s.Name);
                    break;
                default:
                    query = query.Where(s => s.Name.Contains(search));
                    break;
            }
        }

        var count = query.Count();

        var planets = query.Skip((pageNumber - 1) * pageSize).Take(pageSize).AsEnumerable();

        return Ok(new
        {
            data = planets,
            pageNumber,
            pageSize,
            totalCount = count,
            totalPages = (int)Math.Ceiling(count / (double)pageSize)
        });
    }

    [Authorize(Roles = "DEVELOPER")]
    [HttpPost("create")]
    public async Task<ActionResult> Create([FromBody] Planet request)
    {

        var newPlanet = new Planet()
        {
            Name = request.Name,
            Type = request.Type
        };

        await dbContext.Planets.AddAsync(newPlanet);
        await dbContext.SaveChangesAsync();

        return Ok(new
            { message = newPlanet.Id + ", with the name:" + newPlanet.Name+ " was created." });
    }

    [Authorize(Roles = "DEVELOPER")]
    [HttpGet("get")]
    public async Task<ActionResult<Planet>> Get(int id)
    {
        if (dbContext.Planets == null)
        {
            return NotFound();
        }

        var planet = await dbContext.Planets.FirstOrDefaultAsync(s => s.Id == id);

        if (planet == null)
        {
            return NotFound();
        }

        return Ok(planet);
    }

    [Authorize(Roles = "DEVELOPER")]
    [HttpPatch("update/{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] JsonPatchDocument<Planet> patchDoc)
    {
        if (patchDoc != null)
        {
            var planet = await dbContext.Planets.FindAsync(id);

            if (planet == null)
            {
                return BadRequest();
            }

            patchDoc.ApplyTo(planet, ModelState);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await dbContext.SaveChangesAsync();

            return Ok(new { message = "Specialization with the id " + planet.Id + " was updated." });
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
        if (dbContext.Planets == null)
        {
            return NotFound();
        }

        var planet = await dbContext.Planets.FindAsync(id);

        if (planet == null)
        {
            return NotFound();
        }

        dbContext.Planets.Remove(planet);
        await dbContext.SaveChangesAsync();

        return Ok(new { message = planet.Name+ " was removed" });
    }

    [Authorize(Roles = "DEVELOPER")]
    [HttpDelete("delete-soft")]
    public async Task<ActionResult> SoftDelete(int id)
    {
        var planet = await dbContext.Planets.FindAsync(id);

        if (planet == null)
        {
            return NotFound();
        }

        planet.IsDeleted = true;
        await dbContext.SaveChangesAsync();

        return Ok(new { message = planet.Name + " was removed" });
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

        var planetsToDelete = await dbContext.Planets.Where(s => intIds.Contains(s.Id)).ToListAsync();

        if (planetsToDelete == null || planetsToDelete.Count == 0)
        {
            return NotFound(new { message = "No planets found with the provided IDs." });
        }

        dbContext.Planets.RemoveRange(planetsToDelete);
        await dbContext.SaveChangesAsync();

        return Ok(new { message = "Planets were successfully deleted." });
    }

}