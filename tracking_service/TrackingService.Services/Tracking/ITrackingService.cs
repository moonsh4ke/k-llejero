using TrackingService.Domain.DTOs;
using TrackingService.Domain.DTOs.Tracking;

namespace TrackingService.Services.Tracking;

public interface ITrackingService
{
    public Task<ResponseDto<List<TrackingWithNotesDto>>> GetTrackingById(string id);
    public Task<ResponseDto<List<Domain.Entities.Tracking>>> GetTrackingsByTenders(string[] tendersIds);
    public Task<ResponseDto<TrackingByUserDto>> GetTrackingsByUser(PaginationDto pagination);
    public Task<ResponseDto<List<Domain.Entities.Tracking>>> CreateTracking(string tenderId, string userId);
    public Task<ResponseDto<List<Domain.Entities.Tracking>>> UpdateTracking(Domain.Entities.Tracking tracking);
    public Task SaveAndSendTrackings(TendersDto tenders);
}