namespace TrackingService.Repositories.Tracking;

using TrackingService.Domain.Entities;

public interface ITrackingRepository
{
    public Task<Tracking> GetTrackingById(string trackingId);
    public Task<ICollection<Tracking>> GetTrackingsByTenders(string[] tendersIds);
    public Task<Tracking> UpdateTracking(Tracking tracking);
    public IQueryable<Tracking> GetTrackingsByUser(string userId);
    public Task<Tracking> CreateTracking(Tracking tracking);
}
