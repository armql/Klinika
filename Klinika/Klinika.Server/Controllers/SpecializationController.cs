using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Klinika.Server.Models;
using Klinika.Server.Models.Data;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace Klinika.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpecializationController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public SpecializationController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("getAll")]
        public async Task<ActionResult<IEnumerable<Specialization>>> GetAll()
        {
            if(_dbContext.Specializations == null)
            {
                return NotFound();
            }

            return await _dbContext.Specializations.ToListAsync();
        }

        [HttpPost("create")]
        public async Task<ActionResult> Create(Specialization specialization)
        {
            var newSpecialization = new Specialization()
            {
                name = specialization.name,
                createdBy = "Testing",
                creationDate = DateTime.Now,
            };

            await _dbContext.Specializations.AddAsync(newSpecialization);

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

        [HttpPost("update")]
        public async Task<ActionResult> Update(Specialization userRequest)
        {

            var specialization = await _dbContext.Specializations.FindAsync(userRequest.id);

            if (specialization == null)
            {
                return BadRequest();
            }

            specialization.name = userRequest.name;

            await _dbContext.SaveChangesAsync();

            return Ok(new { message = specialization.id + ",with the name " + specialization.name + " was changed to: " + userRequest.name });
        }

        [HttpPost("delete")]
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
    }
}
