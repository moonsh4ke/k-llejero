using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.DependencyInjection;
using NATS.Client.Core;
using NotificationService.Domain.DTOs;
using NotificationService.Services.Notification;
using System.Text.Json;

namespace NotificationService.Services.Tracking;

public class HostedTrackingService : IHostedTrackingService
{
    private readonly IServiceProvider _services;
    private readonly INatsConnection _connection;
    private readonly INotificationService _notificationService;

    public HostedTrackingService(IServiceProvider services, INatsConnection connection, 
        IHubContext<NotificationHub> notificationHubContext, INotificationService notificationService)
    {
        _services = services;
        _connection = connection;
        _notificationService = notificationService;
    }

    public async Task DoWork(CancellationToken stoppingToken)
    {
        using (var scope = _services.CreateScope()) 
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                var result = await _connection.SubscribeCoreAsync<string>("notification:tracking_update");

                Console.WriteLine("Mensaje recibido...!");

                await foreach (var msg in result.Msgs.ReadAllAsync())
                {
                    var dataResult = JsonSerializer.Deserialize<List<TrackingDto>>(msg.Data);

                    await _notificationService.SaveAndSendNotifications(dataResult);
                }
            }
        }
    }
}
