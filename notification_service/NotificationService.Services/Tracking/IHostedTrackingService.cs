namespace NotificationService.Services.Tracking;

public interface IHostedTrackingService
{
    public Task DoWork(CancellationToken stoppingToken);
}
