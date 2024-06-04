using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Klinika.Server.Models;
using Klinika.Server.Models.Data;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Klinika.Server.Models.DTO.Developer;
using Microsoft.AspNetCore.JsonPatch;

namespace Klinika.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HelpCenterController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public HelpCenterController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }


        [HttpGet("paginate")]
        public ActionResult<IEnumerable<HelpCenter>> Paginate(string search = "", int pageNumber = 1, int pageSize = 15)
        {
            if (_dbContext.HelpCenters == null)
            {
                return NotFound();
            }

            var query = _dbContext.HelpCenters.AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                switch (search)
                {
                    case "_byLowId":
                        query = query.OrderBy(h => h.id);
                        break;
                    case "_byHighId":
                        query = query.OrderByDescending(h => h.id);
                        break;
                    case "_byAsc":
                        query = query.OrderBy(h => h.subject);
                        break;
                    case "_byDesc":
                        query = query.OrderByDescending(h => h.subject);
                        break;
                    default:
                        query = query.Where(h => h.subject.Contains(search) || h.name.Contains(search) || h.email.Contains(search) || h.message.Contains(search));
                        break;
                }
            }

            var count = query.Count();

            var helps = query.Skip((pageNumber - 1) * pageSize).Take(pageSize).AsEnumerable();

            return Ok(new
            {
                data = helps,
                pageNumber,
                pageSize,
                totalCount = count,
                totalPages = (int)Math.Ceiling(count / (double)pageSize)
            });
        }

        [HttpPost("create")]
        public async Task<ActionResult> Create(HelpCenter userRequest)
        {


            var newHelp = new HelpCenter()
            {
                name = userRequest.name,
                email = userRequest.email,
                subject = userRequest.subject,
                message = userRequest.message,
                categoryId = userRequest.categoryId,
                creationDate = DateTime.Now,
            };

            await _dbContext.HelpCenters.AddAsync(newHelp);
            await _dbContext.SaveChangesAsync();

            return Ok(new { message = newHelp.id + ", with the name:" + newHelp.name + " was created." });
        }

        [HttpGet("get")]
        public async Task<ActionResult<HelpCenter>> Get(int id)
        {
            if (_dbContext.HelpCenters == null)
            {
                return NotFound();
            }

            var help = await _dbContext.HelpCenters.FirstOrDefaultAsync(s => s.id == id);

            if (help == null)
            {
                return NotFound();
            }

            return help;
        }

        [HttpPatch("update/{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] JsonPatchDocument<HelpCenter> patchDoc)
        {
            if (patchDoc != null)
            {
                var help = await _dbContext.HelpCenters.FindAsync(id);

                if (help == null)
                {
                    return BadRequest();
                }

                patchDoc.ApplyTo(help, ModelState);

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                await _dbContext.SaveChangesAsync();

                return Ok(new { message = "HelpCenter with the id: " + help.id + " was updated." });
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpDelete("delete")]
        public async Task<ActionResult> Delete(int id)
        {
            if (_dbContext.HelpCenters == null)
            {
                return NotFound();
            }

            var help = await _dbContext.HelpCenters.FindAsync(id);

            if (help == null)
            {
                return NotFound();
            }

            _dbContext.HelpCenters.Remove(help);
            await _dbContext.SaveChangesAsync();
            return Ok(new { message = help.name + " was removed" });
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
            
            var consultationsToDelete = await _dbContext.HelpCenters.Where(c => intIds.Contains(c.id)).ToListAsync();
            
            if(consultationsToDelete == null || consultationsToDelete.Count == 0)
            {
                return NotFound(new { message = "No help centers found." });
            }
            
            _dbContext.HelpCenters.RemoveRange(consultationsToDelete);
            await _dbContext.SaveChangesAsync();
            
            return Ok(new { message = "Help Centers were successfully deleted." });
        }
    }
}
