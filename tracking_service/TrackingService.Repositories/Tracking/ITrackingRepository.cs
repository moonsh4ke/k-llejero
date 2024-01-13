namespace TrackingService.Repositories.Tracking;

using TrackingService.Domain.DTOs.Tracking;
using TrackingService.Domain.Entities;

public interface ITrackingRepository
{
    public Task<ICollection<TrackingByTendersDto>> GetTrackingsByTenders(string[] tendersIds);
    public Task<ICollection<Tracking>> GetTrackingsByUser(string userId);
    public Task<Tracking> CreateTracking(Tracking tracking);
}
