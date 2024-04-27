using Microsoft.AspNetCore.Mvc;
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
    public async Task<ResponseDto<List<TrackingDto>>> GetTracking(string trackingId)
    {
        return await _trackingService.GetTrackingById(trackingId);
    }

    //public async Task<ResponseDto<>>

    /*
     * 
     * TODO
     * 1. Add JWT middleware
     * 2. Add input validation
     * 
    */
    [HttpPost("{tenderId}")]
    public async Task<IActionResult> Create([FromHeader] string userId, [FromHeader] string tenderState, string tenderId)
    {
        if (string.IsNullOrEmpty(userId))
        {
            return BadRequest("User id not provided");
        }

        if (string.IsNullOrEmpty(tenderState))
        {
            return BadRequest("tenderState not provided");
        }

        if (string.IsNullOrEmpty(tenderId))
        {
            return BadRequest("Tender id not provided");
        }

        var result = await _trackingService.CreateTracking(tenderId, userId, tenderState);
        return StatusCode(result.StatusCode, result);
    }

    [HttpPut("{trackingId}")]
    [DisableRequestSizeLimit]
    public async Task<IActionResult> Update([FromBody] TrackingDto trackingData)
    {
        var result = await _trackingService.UpdateTrackingByDto(trackingData);
        return StatusCode(result.StatusCode, result.Data);
    }

    [HttpDelete("{trackingId}")]
    public async Task<IActionResult> Delete(string trackingId)
    {
        var result = await _trackingService.DeleteTracking(trackingId);
        return StatusCode(result.StatusCode, result.Data);
    }
}
