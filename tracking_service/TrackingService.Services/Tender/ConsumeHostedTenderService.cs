using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace TrackingService.Services.Tender;

public class ConsumeHostedTenderService : BackgroundService
{
    private readonly IServiceProvider _services;

    public ConsumeHostedTenderService(IServiceProvider services)
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
                    .GetRequiredService<IHostedTenderService>();

            await scopedTenderService.DoWork(stoppingToken);
        }
    }

    public override async Task StopAsync(CancellationToken stoppingToken)
    {
        await base.StopAsync(stoppingToken);
    }
}
