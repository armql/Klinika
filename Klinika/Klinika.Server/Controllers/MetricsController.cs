using Klinika.Server.Models.DTO.Developer;
using Klinika.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// MetricsController.cs
namespace Klinika.Server.Controllers;
[Authorize]
[ApiController]
[Route("api/[controller]")]
public class MetricsController : Controller
{
    private readonly ReservationServices _reservationService;
    private readonly PatientsServices _patientsService;
    private readonly SpecializedServices _specializedService;
    private readonly RegisteredServices _registeredService;

    public MetricsController(ReservationServices reservationService, PatientsServices patientsService,
        SpecializedServices specializedService, RegisteredServices registeredService)
    {
        _reservationService = reservationService;
        _patientsService = patientsService;
        _specializedService = specializedService;
        _registeredService = registeredService;
    }

    [HttpGet("exists/{id:length(24)}")]
    public async Task<IActionResult> CheckIfExists(string id)
    {
        var metric = await _reservationService.GetAsync(id);
        if (metric == null)
        {
            return NotFound("Metric with the given id does not exist.");
        }

        return Ok("Metric with the given id exists.");
    }

    [HttpGet("{id:length(24)}")]
    public async Task<IActionResult> Get(string id)
    {
        try
        {
            var metric = await _reservationService.GetAsync(id);
            if (metric == null)
            {
                return NotFound();
            }

            return Ok(metric);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal server error");
        }
    }
    

    [HttpGet("all")]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            var reservationMetrics = await _reservationService.GetAllAsync();
            var patientMetrics = await _patientsService.GetAllAsync();
            var specializedMetrics = await _specializedService.GetAllAsync();
            var registeredMetrics = await _registeredService.GetAllAsync();

            var results = new
            {
                reservationMetrics,
                patientMetrics,
                specializedMetrics,
                registeredMetrics
            };

            return Ok(results);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPost("create-user")]
    public async Task<IActionResult> CreateUser([FromBody] Metrics metric)
    {
        try
        {
            if (metric == null)
            {
                return BadRequest("Metric object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }
            await _registeredService.CreateAsync(metric);
            return CreatedAtAction(nameof(Get), new { id = metric.Id }, metric);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return StatusCode(500, "Internal server error");
        }
    }
    
    [HttpPost("create-reservation")]
    public async Task<IActionResult> CreateReservation([FromBody] Metrics metric)
    {
        try
        {
            if (metric == null)
            {
                return BadRequest("Metric object is null");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model object");
            }
            await _reservationService.CreateAsync(metric);
            return CreatedAtAction("GetMetric", new { id = metric.Id }, metric);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return StatusCode(500, "Internal server error");
        }
    }
}