using Microsoft.AspNetCore.Mvc;
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

    public IActionResult Index()
    {
        return StatusCode(200, "Hello world!!!");
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
        await _trackingService.CreateTracking(tenderId, "nicolas.fernandez.r@usach.cl");
        return StatusCode(200, $"Created tracking for {tenderId}");
    }
}
