using Klinika.Server.Models;
using Klinika.Server.Models.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Klinika.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceDeskController(ApplicationDbContext dbContext) : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext = dbContext;


        [HttpGet("getAll")]
        public async Task<ActionResult<IEnumerable<ServiceDesk>>> GetAll()
        {
            if (_dbContext.ServiceDesks == null)
            {
                return NotFound();
            }

            return await _dbContext.ServiceDesks.ToListAsync();
        }

        [Authorize]
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

        [HttpPost("update")]
        public async Task<ActionResult> Update(ServiceDesk userRequest)
        {

            var serviceDesk = await _dbContext.ServiceDesks.FindAsync(userRequest.id);

            if (serviceDesk == null)
            {
                return BadRequest();
            }

            serviceDesk.name = userRequest.name;
            serviceDesk.email = userRequest.email;
            serviceDesk.operatingHours = userRequest.operatingHours;
            serviceDesk.blockId = userRequest.blockId;

            await _dbContext.SaveChangesAsync();

            return Ok(new { message = serviceDesk.id + ", with the name: " + serviceDesk.name + " was changed to: " + userRequest.name });
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
    }
}
