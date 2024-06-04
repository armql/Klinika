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
    private readonly MetricServices _metricService;

    public MetricsController(MetricServices metricService)
    {
        _metricService = metricService;
    }
    
    [HttpGet("exists/{id:length(24)}")]
    public async Task<IActionResult> CheckIfExists(string id)
    {
        var metric = await _metricService.GetAsync(id);
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
            var metric = await _metricService.GetAsync(id);
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
            var metrics = await _metricService.GetAllAsync();
            return Ok(metrics);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal server error");
        }
    }
    
    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] Metrics metric)
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

            await _metricService.createAsync(metric);
            return CreatedAtAction(nameof(Get), new { id = metric.Id }, metric);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal server error");
        }
    }
}