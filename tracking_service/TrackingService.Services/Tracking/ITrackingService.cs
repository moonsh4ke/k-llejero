namespace TrackingService.Services.Tracking;

public interface ITrackingService
{
    public Task CreateTracking(string tenderId, string userId);
}
