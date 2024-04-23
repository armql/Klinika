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
    public class HelpCenterCategoryController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly UserManager<ApplicationUser> _userManager;

        public HelpCenterCategoryController(ApplicationDbContext dbContext, UserManager<ApplicationUser> userManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;
        }

        [HttpGet("getAll")]
        public ActionResult<IEnumerable<HelpCenterCategory>> GetAll(string search = "", int pageNumber = 1, int pageSize = 10)
        {
            if (_dbContext.HelpCenterCategorys == null)
            {
                return NotFound();
            }

            var query = _dbContext.HelpCenterCategorys.AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(s => s.name.Contains(search));
            }

            var count = query.Count();

            var categories = query.Skip((pageNumber - 1) * pageSize).Take(pageSize).AsEnumerable();

            return Ok(new
            {
                data = categories,
                pageNumber,
                pageSize,
                totalCount = count,
                totalPages = (int)Math.Ceiling(count / (double)pageSize)
            });
        }

        [Authorize]
        [HttpPost("create")]
        public async Task<ActionResult> Create([FromBody] HelpCenterCategoryDto userRequest)
        {
            var currentUser = await _userManager.GetUserAsync(User);

            if (currentUser == null)
            {
                return Unauthorized(new { message = "User is not authenticated" });
            }

            var newCategory = new HelpCenterCategory()
            {
                name = userRequest.name,
                createdBy = currentUser.firstName,
                creationDate = DateTime.Now,
            };

            await _dbContext.HelpCenterCategorys.AddAsync(newCategory);
            await _dbContext.SaveChangesAsync();

            return Ok(new { message = newCategory.id + ", with the name:" + newCategory.name + " was created." });
        }

        [HttpGet("get")]
        public async Task<ActionResult<HelpCenterCategory>> Get(int id)
        {
            if (_dbContext.HelpCenterCategorys == null)
            {
                return NotFound();
            }

            var category = await _dbContext.HelpCenterCategorys.FirstOrDefaultAsync(s => s.id == id);

            if (category == null)
            {
                return NotFound();
            }

            return category;
        }

        [HttpPatch("update/{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] JsonPatchDocument<HelpCenterCategory> patchDoc)
        {
            if (patchDoc != null)
            {
                var category = await _dbContext.HelpCenterCategorys.FindAsync(id);

                if (category == null)
                {
                    return BadRequest();
                }

                patchDoc.ApplyTo(category, ModelState);

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                await _dbContext.SaveChangesAsync();

                return Ok(new { message = "HelpCenterCategory with the id: " + category.id + " was updated." });
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpDelete("delete")]
        public async Task<ActionResult> Delete(int id)
        {
            if (_dbContext.HelpCenterCategorys == null)
            {
                return NotFound();
            }

            var category = await _dbContext.HelpCenterCategorys.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            _dbContext.HelpCenterCategorys.Remove(category);
            await _dbContext.SaveChangesAsync();
            return Ok(new { message = category.name + " was removed" });
        }
    }
}
