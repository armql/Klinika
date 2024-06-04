
using Klinika.Server.Models;
using Klinika.Server.Models.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;

namespace Klinika.Server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly string _imageFolderPath;

        public ImageController(ApplicationDbContext dbContext, UserManager<ApplicationUser> userManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;
            _imageFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "Images");
            if (!Directory.Exists(_imageFolderPath))
            {
                Directory.CreateDirectory(_imageFolderPath);
            }
        }

        [HttpGet("paginate")]
        public ActionResult<IEnumerable<Image>> Paginate(string search = "", int pageNumber = 1, int pageSize = 15)
        {
            if (_dbContext.Specializations == null)
            {
                return NotFound();
            }

            var query = _dbContext.Images.AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(s => s.fileName.Contains(search) || s.createdBy.Contains(search));
            }

            var count = query.Count();

            var specializations = query.Skip((pageNumber - 1) * pageSize).Take(pageSize).AsEnumerable();

            return Ok(new
            {
                data = specializations,
                pageNumber,
                pageSize,
                totalCount = count,
                totalPages = (int)Math.Ceiling(count / (double)pageSize)
            });
        }
        
        [HttpPost("create")]
        public async Task<IActionResult> UploadImage([FromForm] IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var user = await _userManager.FindByIdAsync(userId);
            if (user != null)
            {
                if (user.profileImage.HasValue)
                {
                    var oldImage = await _dbContext.Images.FindAsync(user.profileImage.Value);
                    if (oldImage != null)
                    {
                        if (System.IO.File.Exists(oldImage.filePath))
                        {
                            System.IO.File.Delete(oldImage.filePath);
                        }

                        _dbContext.Images.Remove(oldImage);
                        await _dbContext.SaveChangesAsync();
                    }
                }
            }

            var filePath = Path.Combine(_imageFolderPath, file.FileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var fileUrl = $"{Request.Scheme}://{Request.Host.Value.Replace("5173", "7045")}/Images/{file.FileName}";
            var image = new Image
            {
                fileName = file.FileName,
                filePath = filePath,
                fileUrl = fileUrl,
                createdBy = user.Email,
                creationDate = DateTime.Now
            };

            await _dbContext.Images.AddAsync(image);
            await _dbContext.SaveChangesAsync();

            if (user != null)
            {
                user.profileImage = image.id;
                await _userManager.UpdateAsync(user);
            }

            return Ok(new { image.id, image.fileName, image.fileUrl });
        }
        
        [HttpGet("get")]
        public async Task<IActionResult> GetImage(string fileName)
        {
            var image = await _dbContext.Images.FirstOrDefaultAsync(i => i.fileName == fileName);
            if (image == null)
                return NotFound("Image not found.");

            var imageFile = System.IO.File.OpenRead(image.filePath);
            return File(imageFile, "image/jpeg");
        }

        [Authorize]
        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteImage(int id)
        {
            var image = await _dbContext.Images.FindAsync(id);
            if (image == null)
                return NotFound("Image not found.");

            System.IO.File.Delete(image.filePath);
            _dbContext.Images.Remove(image);
            await _dbContext.SaveChangesAsync();

            return Ok(new { message = "Image deleted." });
        }

        [Authorize]
        [HttpDelete("bulkDelete")]
        public async Task<IActionResult> BulkDelete([FromBody] List<string> ids)
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
                    return BadRequest(new { message = "Invalid id" });
                }
            }
            
            var imagesToDelete = await _dbContext.Images.Where(i => intIds.Contains(i.id)).ToListAsync();
            
            if(imagesToDelete == null || imagesToDelete.Count == 0)
            {
                return NotFound(new { message = "Images not found" });
            }
            
            _dbContext.Images.RemoveRange(imagesToDelete);
            await _dbContext.SaveChangesAsync();

            return Ok(new { message = "Images deleted" });
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        public async Task<ApplicationUser> GetCurrent()
        {
            if (Request.Headers.ContainsKey("Authorization"))
            {
                var authHeader = Request.Headers["Authorization"].ToString();
                Console.WriteLine(authHeader);
            }
            else
            {
                Console.WriteLine("Authorization header is missing");
            }
            
            string nameIdentifier = User.Claims.FirstOrDefault(c =>
                c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;

            // Use the UserManager to get the ApplicationUser object
            ApplicationUser currentUser = await _userManager.FindByIdAsync(nameIdentifier);

            if (currentUser == null)
            {
                return null;
            }

            return currentUser;
        }
    }
}
