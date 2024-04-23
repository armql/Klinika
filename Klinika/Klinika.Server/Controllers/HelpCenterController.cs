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
    public class HelpCenterController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public HelpCenterController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }


        [HttpGet("getAll")]
        public ActionResult<IEnumerable<HelpCenter>> GetAll(string search = "", int pageNumber = 1, int pageSize = 10)
        {
            if (_dbContext.HelpCenters == null)
            {
                return NotFound();
            }

            var query = _dbContext.HelpCenters.AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(s => s.subject.Contains(search) || s.name.Contains(search) || s.email.Contains(search) || s.message.Contains(search));
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

        //[HttpPost("update")]
        //public async Task<ActionResult> Update(HelpCenter userRequest)
        //{

        //    var help = await _dbContext.HelpCenters.FindAsync(userRequest.id);

        //    if (help == null)
        //    {
        //        return BadRequest();
        //    }

        //    help.name = userRequest.name;
        //    help.email = userRequest.email;
        //    help.subject = userRequest.subject;
        //    help.message = userRequest.message;

        //    await _dbContext.SaveChangesAsync();

        //    return Ok(new { message = help.id + ", with the name: " + help.name + " was changed to: " + userRequest.name });
        //}

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
    }
}
