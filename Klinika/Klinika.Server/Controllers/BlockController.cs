using Klinika.Server.Models;
using Klinika.Server.Models.Data;
using Klinika.Server.Models.DTO.Developer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Klinika.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlockController(ApplicationDbContext dbContext) : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext = dbContext;


        //[HttpGet("getAll")]
        //public async Task<ActionResult<IEnumerable<Block>>> GetAll()
        //{
        //    if (_dbContext.Blocks == null)
        //    {
        //        return NotFound();
        //    }

        //    return await _dbContext.Blocks.ToListAsync();
        //}

        [HttpGet("getAll")]
        public ActionResult<IEnumerable<Block>> GetAll(string search = "", int pageNumber = 1, int pageSize = 10)
        {
            if (_dbContext.Blocks == null)
            {
                return NotFound();
            }

            var query = _dbContext.Blocks.AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(s => s.name.Contains(search));
            }

            var count = query.Count();

            var blocks = query.Skip((pageNumber - 1) * pageSize).Take(pageSize).AsEnumerable();

            return Ok(new
            {
                data = blocks,
                pageNumber,
                pageSize,
                totalCount = count,
                totalPages = (int)Math.Ceiling(count / (double)pageSize)
            });
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

        //[HttpPost("update")]
        //public async Task<ActionResult> Update(Block userRequest)
        //{

        //    var block = await _dbContext.Blocks.FindAsync(userRequest.id);

        //    if (block == null)
        //    {
        //        return BadRequest();
        //    }

        //    block.name = userRequest.name;
        //    block.specializationId = userRequest.specializationId;

        //    await _dbContext.SaveChangesAsync();

        //    return Ok(new { message = block.id + ", with the name: " + block.name + " was changed to: " + userRequest.name });
        //}

        [HttpPatch("update/{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] JsonPatchDocument<Block> patchDoc)
        {
            if (patchDoc != null)
            {
                var block = await _dbContext.Blocks.FindAsync(id);

                if (block == null)
                {
                    return BadRequest();
                }

                patchDoc.ApplyTo(block, ModelState); ;

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                await _dbContext.SaveChangesAsync();

                return Ok(new { message = "Blocks with the id: " + block.id + " was updated." });
            }
            else
            {
                return BadRequest(ModelState);
            }
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
