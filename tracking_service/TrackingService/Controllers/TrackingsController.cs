using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Bcpg;
using TrackingService.Domain.DTOs;
using TrackingService.Domain.DTOs.Tracking;
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
    public async Task<ResponseDto<TrackingByUserDto>> GetTrackings([FromQuery] PaginationDto paginationDto)
    {
        return await _trackingService.GetTrackingsByUser(paginationDto);
    }

    [HttpGet("{trackingId}")]
    public async Task<ResponseDto<List<TrackingWithNotesDto>>> GetTracking(string trackingId)
    {
        return await _trackingService.GetTrackingById(trackingId);
    }

    /*
     * 
     * TODO
     * 1. Add JWT middleware
     * 2. Add input validation
     * 
    */
    [HttpPost("{tenderId}")]
    public async Task<IActionResult> Create([FromHeader] string userId, string tenderId)
    {
        if (string.IsNullOrEmpty(userId))
        {
            return BadRequest("User id not provided");
        }

        if (string.IsNullOrEmpty(tenderId))
        {
            return BadRequest("Tender id not provided");

        }

        var result = await _trackingService.CreateTracking(tenderId, userId);
        return StatusCode(result.StatusCode, result);
    }
}
