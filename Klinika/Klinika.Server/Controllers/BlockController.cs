using Klinika.Server.Models;
using Klinika.Server.Models.Data;
using Klinika.Server.Models.DTO.Developer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Klinika.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlockController(ApplicationDbContext dbContext) : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext = dbContext;


        [HttpGet("getAll")]
        public async Task<ActionResult<IEnumerable<Block>>> GetAll()
        {
            if (_dbContext.Blocks == null)
            {
                return NotFound();
            }

            return await _dbContext.Blocks.ToListAsync();
        }

        [Authorize]
        [HttpPost("create")]
        public async Task<ActionResult> Create(Block userRequest)
        {
            var newBlock= new Block()
            {
                name = userRequest.name,
                specializationId = userRequest.specializationId,
            };

            await _dbContext.Blocks.AddAsync(newBlock);
            await _dbContext.SaveChangesAsync();

            return Ok(new { message = newBlock.id + ", with the name: " + newBlock.name + " was created." });
        }

        [HttpGet("get")]
        public async Task<ActionResult<Block>> Get(int id)
        {
            if (_dbContext.Blocks == null)
            {
                return NotFound();
            }

            var block = await _dbContext.Blocks.FirstOrDefaultAsync(s => s.id == id);

            if (block == null)
            {
                return NotFound();
            }

            return block;
        }

        [HttpPost("update")]
        public async Task<ActionResult> Update(Block userRequest)
        {

            var block = await _dbContext.Blocks.FindAsync(userRequest.id);

            if (block == null)
            {
                return BadRequest();
            }

            block.name = userRequest.name;
            block.specializationId = userRequest.specializationId;

            await _dbContext.SaveChangesAsync();

            return Ok(new { message = block.id + ", with the name: " + block.name + " was changed to: " + userRequest.name });
        }

        [HttpDelete("delete")]
        public async Task<ActionResult> Delete(int id)
        {
            if (_dbContext.Blocks == null)
            {
                return NotFound();
            }

            var block = await _dbContext.Blocks.FindAsync(id);

            if (block == null)
            {
                return NotFound();
            }

            _dbContext.Blocks.Remove(block);
            await _dbContext.SaveChangesAsync();
            return Ok(new { message = block.name + " was removed" });
        }
    }
}
