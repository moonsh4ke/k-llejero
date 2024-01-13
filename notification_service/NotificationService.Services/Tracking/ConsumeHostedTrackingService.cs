using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace NotificationService.Services.Tracking;

public class ConsumeHostedTrackingService : BackgroundService
{
    private readonly IServiceProvider _services;

    public ConsumeHostedTrackingService(IServiceProvider services)
    {
        _services = services;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await DoWork(stoppingToken);
    }

    private async Task DoWork(CancellationToken stoppingToken)
    {
        using (var scope = _services.CreateScope())
        {
            var scopedTenderService =
                scope.ServiceProvider
                    .GetRequiredService<IHostedTrackingService>();

            await scopedTenderService.DoWork(stoppingToken);
        }
    }

    public override async Task StopAsync(CancellationToken stoppingToken)
    {
        await base.StopAsync(stoppingToken);
    }
}
