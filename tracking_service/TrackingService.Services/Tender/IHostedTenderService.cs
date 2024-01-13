namespace TrackingService.Services.Tender;

public interface IHostedTenderService
{
    public Task DoWork(CancellationToken stoppingToken);
}
