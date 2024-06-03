using Klinika.Server.Configurations;
using Klinika.Server.Models;
using Klinika.Server.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Klinika.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ReportController : Controller
{
    private readonly FeeServices _feeServices;
    private readonly IMongoCollection<Report> _reportCollection;

    public ReportController(FeeServices feeServices, IOptions<MongoSettings> clientSettings)
    {
        _feeServices = feeServices;
        var client = new MongoClient(clientSettings.Value.ConnectionString);
        var mongoDb = client.GetDatabase(clientSettings.Value.Database);
        _reportCollection = mongoDb.GetCollection<Report>(clientSettings.Value.Report);
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

        if (specialization.feeReleased.Contains(request.UserId))
        {
            return BadRequest(new { error = $"Fee already released for this user for {request.SpecializationName}." });
        }

        specialization.feeReleased.Add(request.UserId);
        await _feeServices.UpdateFeeAsync(feeId, fee);

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