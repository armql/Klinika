using Klinika.Server.Models;
using Klinika.Server.Models.Data;
using Klinika.Server.Models.DTO;
using Klinika.Server.Models.DTO.Developer;
using Klinika.Server.Models.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Klinika.Server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, ApplicationDbContext dbContext) : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager = userManager;
        private readonly RoleManager<IdentityRole> _roleManager = roleManager;
        private readonly ApplicationDbContext _dbContext = dbContext;
        private readonly RoleController _roleController;

        
        [HttpGet("count")]
        public async Task<ActionResult> CountEntities()
        {
            var usersCount = await _userManager.Users.CountAsync();
            var reservationsCount = await _dbContext.Reservations.CountAsync();
            var specializedDoctorsCount = await _dbContext.SpecializedDoctors.CountAsync();
            var patientsCount = await _dbContext.Patients.CountAsync();

            var result = new
            {
                usersCount,
                reservationsCount,
                specializedDoctorsCount,
                patientsCount
            };

            return Ok(result);
        }
        
        [HttpGet("getCurrent")]
        public async Task<ActionResult> GetCurrent(string id)
        {
            if (_dbContext.Users == null)
            {
                return NotFound();
            }

            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                return NotFound();
            }

            var reservations = await _dbContext.Reservations
                .Where(r => r.patientId == id)
                .Include(r => r.specializedDoctor)
                .ThenInclude(sd => sd.Specialization)
                .Select(r => new 
                {
                    r.id,
                    r.reasonOfConsultation,
                    r.date,
                    r.slot,
                    r.creationDate,
                    specializedDoctorName = r.specializedDoctor.User.firstName + " " + r.specializedDoctor.User.lastName,
                    specializationName = r.specializedDoctor.Specialization.name
                })
                .ToListAsync();

            var reservationCount = reservations.Count;

            var result = new
            {
                firstName = user.firstName,
                lastName = user.lastName,
                gender = user.gender,
                reservationsCount = reservationCount,
                reservations
            };

            return Ok(result);
        }
        
        [HttpGet("paginate")]
        public ActionResult<IEnumerable<ApplicationUser>> Paginate(string search = "", int pageNumber = 1, int pageSize = 15)
        {
            if (_dbContext.Users == null)
            {
                return NotFound();
            }

            var query = _dbContext.Users.AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                switch (search)
                {
                    case "_byLowId":
                        query = query.OrderBy(u => u.Id);
                        break;
                    case "_byHighId":
                        query = query.OrderByDescending(u => u.Id);
                        break;
                    case "_byAsc":
                        query = query.OrderBy(u => u.firstName);
                        break;
                    case "_byDesc":
                        query = query.OrderByDescending(u => u.firstName);
                        break;
                    default:
                        query = query.Where(u => u.Email.Contains(search) || u.firstName.Contains(search) || u.lastName.Contains(search) || u.PhoneNumber.Contains(search));
                        break;
                }
            }

            var count = query.Count();

            var users = query.Skip((pageNumber - 1) * pageSize).Take(pageSize).AsEnumerable();

            return Ok(new
            {
                data = users,
                pageNumber,
                pageSize,
                totalCount = count,
                totalPages = (int)Math.Ceiling(count / (double)pageSize)
            });
        }
        
        [HttpPost("assignRole")]
        public async Task<ActionResult> AssignRole(string id, string roleName)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return BadRequest();
            }

            var roleExists = await _roleManager.RoleExistsAsync(roleName);
            if (!roleExists)
            {
                await _roleController.SeedRoles();
            }

            roleExists = await _roleManager.RoleExistsAsync(roleName);
            if (!roleExists)
            {
                return BadRequest("Role does not exist and seeding failed.");
            }

            var userRoles = await _userManager.GetRolesAsync(user);
            if (userRoles.Any())
            {
                await _userManager.RemoveFromRolesAsync(user, userRoles);
            }

            await _userManager.AddToRoleAsync(user, roleName);
            return Ok("Success");
        }

        [HttpGet("getAll")]
        public async Task<ActionResult<IEnumerable<ApplicationUser>>> GetAll()
        {
            if (_userManager.Users == null)
            {
                return NotFound();
            }

            var users = await _userManager.Users.ToListAsync();

            if (users == null)
            {
                return NotFound();
            }

            return users;
        }
        
        [HttpGet("get")]
        public async Task<ActionResult<ApplicationUser>> Get(string id)
        {
            if (_userManager.Users == null)
            {
                return NotFound();
            }

            // Include the Image object in the query
            var user = await _userManager.Users
                .Include(u => u.image)
                .Select(u => new 
                {
                    u.Id,
                    u.Email,
                    u.firstName,
                    u.lastName,
                    u.profileImage,
                    image = u.image != null ? u.image.fileUrl : null
                })
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }


        [HttpPost("create")]
        public async Task<ActionResult> RegisterUser(ApplicationUser userRequest)
        {
            string message = "";
            IdentityResult result = new();

            try
            {
                var hashedPassword = HashPassword(userRequest.password);

                ApplicationUser newUser = new ApplicationUser()
                {
                    firstName = userRequest.firstName,
                    lastName = userRequest.lastName,
                    birthDate = userRequest.birthDate,
                    gender = userRequest.gender.ToLower(),
                    Email = userRequest.Email.ToLower(),
                    UserName = userRequest.Email,
                    PasswordHash = hashedPassword
                };
                result = await _userManager.CreateAsync(newUser);

                if (!result.Succeeded)
                {
                    return BadRequest(result);
                }

                Patient newPatient = new Patient()
                {
                    id = newUser.Id,
                };

                await _dbContext.Patients.AddAsync(newPatient);
                await _dbContext.SaveChangesAsync();

                message = "Created Successfully.";
            }
            catch (Exception ex)
            {
                return BadRequest("Something went wrong please try again." + ex.Message);
            }

            return Ok(new { message = message, result = result });
        }
        

        [HttpPatch("update/{id}")]
        public async Task<IActionResult> UpdateUser(string id, [FromBody] JsonPatchDocument<ApplicationUser> patchDoc)
        {
            if (patchDoc != null)
            {
                var user = await _userManager.FindByIdAsync(id);

                if (user == null)
                {
                    return NotFound();
                }

                var imageOperation = patchDoc.Operations.FirstOrDefault(o => o.path.ToLower() == "/image");
                if (imageOperation != null)
                {
                    var imageFile = imageOperation.value as IFormFile;
                    if (imageFile != null)
                    {
                        var imageController = new ImageController(_dbContext, _userManager);
                        var imageResult = await imageController.UploadImage(imageFile) as OkObjectResult;

                        if (imageResult != null)
                        {
                            var image = imageResult.Value as Image;
                            if (image != null)
                            {
                                user.profileImage = image.id;
                            }
                        }
                    }
                }

                patchDoc.ApplyTo(user, ModelState);

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var result = await _userManager.UpdateAsync(user);

                if (!result.Succeeded)
                {
                    return BadRequest(result);
                }

                return Ok(new { message = "User with the id: " + user.Id + " was updated." });
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpDelete("delete")]
        public async Task<ActionResult> Delete(string id)
        {
            string message = "";
            IdentityResult result = new();

            try
            {
                if (_userManager.Users == null)
                {
                    return NotFound();
                }

                var user = await _userManager.FindByIdAsync(id);

                result = await _userManager.DeleteAsync(user);

                message = "Deleted Successfully.";
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok(new { message = message, result = result });
        }
        
        [HttpPost("updateEmail")]
        public async Task<IActionResult> UpdateEmail([FromBody] UpdateEmailDto model)
        {
            var user = await _userManager.FindByIdAsync(model.id);
            if (user == null)
            {
                return NotFound();
            }

            var token = await _userManager.GenerateChangeEmailTokenAsync(user, model.newEmail);
            var result = await _userManager.ChangeEmailAsync(user, model.newEmail, token);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok();
        }
        
        [HttpPost("updatePassword")]
        public async Task<IActionResult> UpdatePassword([FromBody] UpdatePasswordDto model)
        {
            var user = await _userManager.FindByIdAsync(model.id);
            if (user == null)
            {
                return NotFound();
            }

            var result = await _userManager.ChangePasswordAsync(user, model.currentPassword, model.newPassword);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok();
        }

        [HttpPost("updateName")]
        public async Task<IActionResult> UpdateName([FromBody] UpdateNameDto model)
        {
            var user = await _userManager.FindByIdAsync(model.id);
            if (user == null)
            {
                return NotFound();
            }

            user.firstName = model.firstName;
            user.lastName = model.lastName;

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            return Ok();
        }

         
        [ApiExplorerSettings(IgnoreApi = true)]
        public string HashPassword(string password)
        {
            var hasher = new PasswordHasher<object>();
            string hashedPassword = hasher.HashPassword(null, password);
            return hashedPassword;
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        public bool VerifyPassword(string hashedPassword, string providedPassword)
        {
            var hasher = new PasswordHasher<object>();
            var result = hasher.VerifyHashedPassword(null, hashedPassword, providedPassword);
            return result == PasswordVerificationResult.Success;
        }
        
        [HttpDelete("bulkDelete")]
        public async Task<ActionResult> BulkDelete([FromBody] List<string> ids)
        {
            var specializedDoctorsToDelete = await _dbContext.Users.Where(s => ids.Contains(s.Id)).ToListAsync();
            
            
            if (specializedDoctorsToDelete.Count == 0 || specializedDoctorsToDelete == null)
            {
                return NotFound();
            }
            
            _dbContext.Users.RemoveRange(specializedDoctorsToDelete);
            await _dbContext.SaveChangesAsync();
            
            return Ok(new { message = "Accounts were successfully deleted." });
        } 
    }
}
