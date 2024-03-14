using Microsoft.Extensions.DependencyInjection;
using NATS.Client.Core;
using System.Text.Json;
using TrackingService.Domain.Dictionaries;
using TrackingService.Domain.DTOs;
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

                Console.WriteLine("Mensaje recibido!!");

                await foreach (var msg in result.Msgs.ReadAllAsync())
                {
                    // todo: change it
                    var updatedTenders = JsonSerializer.Deserialize<List<TendersDto>>(msg.Data);

                    if (updatedTenders is null || !updatedTenders.Any())
                    {
                        continue;
                    }

                    var tenderIds = updatedTenders?.Select(data => data.id).ToArray();

                    if (tenderIds is null || !tenderIds.Any())
                    {
                        continue;
                    }

                    var trackings = await _trackingService.GetTrackingsByTenders(tenderIds);

                    if (trackings is null || !trackings.Data.Any())
                    {
                        continue;
                    }

                    var payload = new List<NotificationDto>();

                    foreach (var tracking in trackings.Data)
                    {
                        int statusId = updatedTenders.Where(data => data.id == tracking.TenderId).Select(data => data.updatedState).FirstOrDefault();
                        string tenderStatus = TenderStatusOptions.Options.GetValueOrDefault(statusId) ?? "";
                        payload.Add(new()
                        {
                            TrackingId = tracking.Id,
                            TenderId = tracking.TenderId,
                            UserId = tracking.UserId,
                            TenderNewState = tenderStatus,
                            TenderNewStateId = statusId
                        });

                        tracking.TrackingStatusId = statusId;
                        await _trackingService.UpdateTracking(tracking);
                        // actualizar tracking con nuevo estado...
                    }

                    Console.WriteLine("Enviando notificación...!");
                    Console.WriteLine(JsonSerializer.Serialize(payload));

                    // Notify notification service
                    await _connection.PublishAsync("notification:tracking_update", JsonSerializer.Serialize(payload));
                }
            }
        }
    }
}
