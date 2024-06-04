using Klinika.Server.Configurations;
using Klinika.Server.Models;
using Klinika.Server.Models.Data;
using Klinika.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Klinika.Server.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class ReportController : Controller
{
    private readonly FeeServices _feeServices;
    private readonly IMongoCollection<Report> _reportCollection;
    private readonly UserManager<ApplicationUser> _userManager;

    public ReportController(FeeServices feeServices, IOptions<MongoSettings> clientSettings, UserManager<ApplicationUser> userManager)
    {
        _feeServices = feeServices;
        var client = new MongoClient(clientSettings.Value.ConnectionString);
        var mongoDb = client.GetDatabase(clientSettings.Value.Database);
        _reportCollection = mongoDb.GetCollection<Report>(clientSettings.Value.Report);
        _userManager = userManager;
    }

    [HttpGet("paginate")]
    public async Task<ActionResult> GetAllReports(string search = "", int pageNumber = 1, int pageSize = 15)
    {
        var builder = Builders<Report>.Filter;
        var filter = builder.Empty;

        if (!string.IsNullOrEmpty(search))
        {
            filter = builder.Regex(r => r.Note, new BsonRegularExpression(search, "i"));
        }

        var count = await _reportCollection.CountDocumentsAsync(filter);

        var reports = await _reportCollection.Find(filter)
            .Skip((pageNumber - 1) * pageSize)
            .Limit(pageSize)
            .ToListAsync();

        var userReports = new List<UserReport>();

        foreach (var report in reports)
        {
            var user = await _userManager.FindByIdAsync(report.UserId);
            var primaryCareUser = await _userManager.FindByIdAsync(report.PrimaryCareId);

            userReports.Add(new UserReport
            {
                Id = report._id.ToString(),
                Note = report.Note,
                UserFullName = $"{user.firstName} {user.lastName}",
                PrimaryCareFullName = $"{primaryCareUser.firstName} {primaryCareUser.lastName}"
            });
        }

        return Ok(new
        {
            data = userReports,
            pageNumber,
            pageSize,
            totalCount = count,
            totalPages = (int)Math.Ceiling(count / (double)pageSize)
        });
    }
    
    [HttpPost("prescribe")]
    public async Task<IActionResult> Prescribe(PrescribeRequest request)
    {
        var feeId = new ObjectId("6657212297a1aaaf1e124ee6");
        var fee = await _feeServices.GetFeeAsync(feeId);

        if (fee == null)
        {
            return NotFound(new { error = $"Fee with ID {feeId} not found." });
        }

        var specialization = fee.Specializations.FirstOrDefault(s => s.name == request.SpecializationName);
        if (specialization == null)
        {
            return NotFound(new { error = $"Specialization {request.SpecializationName} not found in fee." });
        }

        if (request.SpecializationName != "Family Care")
        {
            if (specialization.feeReleased.Contains(request.UserId))
            {
                return BadRequest(new { error = $"Fee already released for this user for {request.SpecializationName}." });
            }

            specialization.feeReleased.Add(request.UserId);
            await _feeServices.UpdateFeeAsync(feeId, fee);
        }

        var report = new Report
        {
            Note = request.Note,
            UserId = request.UserId,
            PrimaryCareId = request.PrimaryCareId
        };

        await _reportCollection.InsertOneAsync(report);

        return Ok(new { message = $"Prescription for user {request.UserId} for specialization {request.SpecializationName} has been added." });
    }
}