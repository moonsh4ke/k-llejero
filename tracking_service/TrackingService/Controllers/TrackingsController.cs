using Microsoft.AspNetCore.Mvc;
using MySqlX.XDevAPI.Common;
using TrackingService.Domain.DTOs;
using TrackingService.Services.Tracking;

namespace TrackingServiceAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TrackingsController : ControllerBase
{
    private ITrackingService _trackingService;
    public TrackingsController(ITrackingService trackingService) 
    {
        _trackingService = trackingService;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var result = await _trackingService.GetTrackingsByUser("nicolas.fernandez.r@usach.cl");
        return StatusCode(result.StatusCode, result);
    }

    /*
     * 
     * TODO
     * 1. Add JWT middleware
     * 2. Add input validation
     * 
    */
    [HttpPost("{tenderId}")]
    public async Task<IActionResult> Create(string tenderId)
    {
        var result = await _trackingService.CreateTracking(tenderId, "nicolas.fernandez.r@usach.cl");
        return StatusCode(result.StatusCode, result);
    }
}
