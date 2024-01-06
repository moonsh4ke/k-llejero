using NATS.Client.Core;
using TrackingService.Domain.Enums;

namespace TrackingService.Services.Tracking;

public class TrackingService : ITrackingService
{
    private INatsConnection _connection;
    public TrackingService(INatsConnection connection)
    {
        _connection = connection;
    }

    public async Task CreateTracking(string tenderId, string userId)
    {
        try
        {
            Guid trackingId = new();

            // TODO: validate tenderId

            //await _connection.SubscribeAsync();

            Domain.Entities.Tracking newTracking = new()
            {
                Id = trackingId,
                TenderId = tenderId,
                UserId = userId,
                TrackingStatusId = (int)TrackingStatusOptions.Created
            };

            var xd = await _connection.SubscribeCoreAsync<string>("tender:update");

            await foreach (var msg in xd.Msgs.ReadAllAsync())
            {
                Console.WriteLine($"Received {msg.Subject}: {msg.Data}\n");
            }

            // TODO: Upload to DB and notify NotificationsAPI
            await _connection.PublishAsync("tracking:created", $"created tracking for tender {tenderId}");
        }
        catch (Exception ex)
        {   
            // TODO: Add logs
            Console.WriteLine(ex.ToString());
        }
    }
}
