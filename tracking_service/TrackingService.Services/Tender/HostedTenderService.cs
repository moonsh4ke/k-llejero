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

                Console.WriteLine($"Mensaje recibido: {result.Subject}");

                await foreach (var msg in result.Msgs.ReadAllAsync())
                {
                    Console.WriteLine($"Mensaje recibido, data: {msg.Data}");
                    // todo: change it
                    var updatedTenders = JsonSerializer.Deserialize<List<TendersDto>>(msg.Data);

                    Console.WriteLine($"UpdatedTenders: {updatedTenders}");

                    if (updatedTenders is null || !updatedTenders.Any())
                    {
                        Console.WriteLine($"UpdatedTenders: null");
                        continue;
                    }

                    var tenderIds = updatedTenders?.Select(data => data.code).ToArray();

                    if (tenderIds is null || !tenderIds.Any())
                    {
                        Console.WriteLine($"tenderIds: null");
                        continue;
                    }

                    var trackings = await _trackingService.GetTrackingsByTenders(tenderIds);

                    if (trackings is null || !trackings.Data.Any())
                    {
                        Console.WriteLine($"trackings: null");
                        continue;
                    }

                    var payload = new List<NotificationDto>();

                    foreach (var tracking in trackings.Data)
                    {
                        Console.WriteLine($"trackings: {JsonSerializer.Serialize(tracking)}");
                        int statusId = updatedTenders.Where(data => data.code == tracking.TenderId).Select(data => data.updatedState).FirstOrDefault();

                        Console.WriteLine($"trackings - statusId: {statusId}");

                        string tenderStatus = TenderStatusOptions.Options.GetValueOrDefault(statusId) ?? "";

                        payload.Add(new()
                        {
                            TrackingId = tracking.Id,
                            TenderId = tracking.TenderId,
                            UserId = tracking.UserId,
                            TenderNewState = tenderStatus,
                            TenderNewStateId = statusId
                        });

                        tracking.UpdatedDate = DateTime.UtcNow;
                        tracking.TenderStatusId = statusId;
                        await _trackingService.UpdateTracking(tracking);
                    }

                    var parsedPayload = JsonSerializer.Serialize(payload);

                    Console.WriteLine($"Enviando notificacion: {parsedPayload}");

                    // Notify notification service
                    await _connection.PublishAsync("notification:tracking_update", parsedPayload);
                }
            }
        }
    }
}
