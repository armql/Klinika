﻿using Microsoft.AspNetCore.Http;
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
        public async Task<ActionResult<IEnumerable<HelpCenterCategory>>> GetAll()
        {
            var helpCenterCategories = await _dbContext.HelpCenterCategorys.ToListAsync();
            if (helpCenterCategories == null)
            {
                return NotFound();
            }

            return helpCenterCategories;
        }
        
        [HttpGet("paginate")]
        public ActionResult<IEnumerable<HelpCenterCategory>> Paginate(string search = "", int pageNumber = 1, int pageSize = 15)
        {
            if (_dbContext.HelpCenterCategorys == null)
            {
                return NotFound();
            }

            var query = _dbContext.HelpCenterCategorys.AsQueryable();

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
                        query = query.OrderBy(h => h.name);
                        break;
                    case "_byDesc":
                        query = query.OrderByDescending(h => h.name);
                        break;
                    default:
                        query = query.Where(h => h.name.Contains(search));
                        break;
                }
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

        //[Authorize]
        [HttpPost("create")]
        public async Task<ActionResult> Create([FromBody] HelpCenterCategoryDto userRequest)
        {
            var currentUser = await _userManager.GetUserAsync(User);

            //if (currentUser == null)
            //{
            //    return Unauthorized(new { message = "User is not authenticated" });
            //}

            var newCategory = new HelpCenterCategory()
            {
                name = userRequest.name,
                createdBy = currentUser.Email,
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
            
            var consultationsToDelete = await _dbContext.HelpCenterCategorys.Where(c => intIds.Contains(c.id)).ToListAsync();
            
            if(consultationsToDelete == null || consultationsToDelete.Count == 0)
            {
                return NotFound(new { message = "No Help Center Categorys found." });
            }
            
            _dbContext.HelpCenterCategorys.RemoveRange(consultationsToDelete);
            await _dbContext.SaveChangesAsync();
            
            return Ok(new { message = "Help Center Categorys were successfully deleted." });
        }
    }
}
