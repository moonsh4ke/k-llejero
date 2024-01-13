using Microsoft.Extensions.DependencyInjection;
using NATS.Client.Core;
using NotificationService.Domain;
using System.Text.Json;

namespace NotificationService.Services.Tracking;

public class HostedTrackingService : IHostedTrackingService
{
    private readonly IServiceProvider _services;
    private readonly INatsConnection _connection;

    public HostedTrackingService(IServiceProvider services, INatsConnection connection)
    {
        _services = services;
        _connection = connection;
    }

    public async Task DoWork(CancellationToken stoppingToken)
    {
        using (var scope = _services.CreateScope()) 
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                var result = await _connection.SubscribeCoreAsync<string>("notification:tracking_update");

                await foreach (var msg in result.Msgs.ReadAllAsync())
                {
                    var dataResult = JsonSerializer.Deserialize<List<TestDto>>(msg.Data);

                    List<Task> tasks = new ();

                    foreach (var data in dataResult)
                    {
                        var publishTask = Task.Run(() => _connection.PublishAsync("notification:tracking_notify", $"Atención usuario {data?.UserId}!!! La licitación {data?.TenderId ?? "NULL"} cambió de estado a {data?.TenderNewState ?? "NULL"}"));
                        tasks.Add(publishTask);
                    }

                    await Task.WhenAll(tasks);
                }
            }
        }
    }
}
