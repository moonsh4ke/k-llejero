using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.DependencyInjection;
using NATS.Client.Core;
using NotificationService.Domain;
using NotificationService.Services.Notification;
using System.Text.Json;

namespace NotificationService.Services.Tracking;

public class HostedTrackingService : IHostedTrackingService
{
    private readonly IServiceProvider _services;
    private readonly INatsConnection _connection;
    private readonly IHubContext<NotificationHub> _notificationHubContext;

    public HostedTrackingService(IServiceProvider services, INatsConnection connection, IHubContext<NotificationHub> notificationHubContext)
    {
        _services = services;
        _connection = connection;
        _notificationHubContext = notificationHubContext;
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
                    var dataResult = JsonSerializer.Deserialize<List<TestDto>>(msg.Data);

                    List<Task> tasks = new();

                    Console.WriteLine("Enviando notificaciones...!");

                    foreach (var data in dataResult)
                    {
                        string userId = data?.UserId ?? "";
                        string tenderId = data?.TenderId ?? "";
                        string tenderNewState = data?.TenderNewState ?? "";

                        Domain.Entities.Notification notification = new()
                        {
                            Id = Guid.NewGuid().ToString(),
                            TenderId = tenderId,
                            UserId = userId,
                            Content = $"La licitación {tenderId} cambió de estado a {tenderNewState}",
                            CreatedDate = DateTime.UtcNow,
                            Readed = false,
                        };

                        string notificationClient = $"notificationSendToUser-{userId}";
                        var publishTask = Task.Run(() => _notificationHubContext.Clients.All.SendAsync(notificationClient, notification));
                        tasks.Add(publishTask);
                    }

                    await Task.WhenAll(tasks);

                    Console.WriteLine("Notificaciones enviadas...!");
                }
            }
        }
    }
}
