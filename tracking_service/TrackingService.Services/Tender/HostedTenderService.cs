using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using NATS.Client.Core;
using System.Text.Json;
using TrackingService.Domain.DTOs;
using TrackingService.Domain.DTOs.Tracking;
using TrackingService.Repositories;
using TrackingService.Services.Tracking;

namespace TrackingService.Services.Tender;

public class HostedTenderService : IHostedTenderService
{
    private readonly IServiceProvider _services;
    private readonly INatsConnection _connection;
    private readonly ITrackingService _trackingService;

    public HostedTenderService(IServiceProvider services, INatsConnection connection, ITrackingService trackingService)
    {
        _services = services;
        _connection = connection;
        _trackingService = trackingService;
    }

    public async Task DoWork(CancellationToken stoppingToken)
    {
        using (var scope = _services.CreateScope())
        {
            var scopedDbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

            while (!stoppingToken.IsCancellationRequested)
            {
                // TODO: Add logs

                var result = await _connection.SubscribeCoreAsync<string>("tracking:tender_update");

                await foreach (var msg in result.Msgs.ReadAllAsync())
                {
                    // todo: change it
                    string[] tendersIds = new string[] { msg.Data ?? "" };

                    var trackings = await _trackingService.GetTrackingsByTenders(tendersIds);

                    if (trackings is null || !trackings.Data.Any())
                    {
                        continue;
                    }

                    TestDto payload = new()
                    {
                        TrackingId = trackings.Data.ToList()[0].TrackingId.ToString(),
                        TenderId = trackings.Data.ToList()[0].TenderId.ToString(),
                        UserId = trackings.Data.ToList()[0].UserEmail.ToString(),
                    };

                    // Notify notification service
                    await _connection.PublishAsync("notification:tracking_update", JsonSerializer.Serialize(payload));
                }
            }
        }
    }
}
