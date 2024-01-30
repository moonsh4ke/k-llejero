using TrackingService.Domain.DTOs;
using TrackingService.Domain.DTOs.Tracking;

namespace TrackingService.Services.Tracking;

public interface ITrackingService
{
    public Task<ResponseDto<TrackingByTendersDto>> GetTrackingsByTenders(string[] tendersIds);
    public Task<ResponseDto<Domain.Entities.Tracking>> GetTrackingsByUser(string userId);
    public Task<ResponseDto<Domain.Entities.Tracking>> CreateTracking(string tenderId, string userId);
    public Task<ResponseDto<Domain.Entities.Tracking>> UpdateTrackingStatus(string tenderId, string userId, int statusId);
}
