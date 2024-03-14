using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NATS.Client.Core;
using NATS.Client.Hosting;
using NotificationService.Services.Notification;
using NotificationService.Services.Tracking;

namespace NotificationService.Services;

public static class ServiceExtensions
{
    public static void AddNotificationServiceServices(this IServiceCollection services, IConfiguration configuration)
    {
        var natsUrl = Environment.GetEnvironmentVariable("NATS_URL") ?? configuration.GetConnectionString("DefaultUrl");

        NatsOpts opts = new()
        {
            Url = natsUrl
        };

        // Add nats
        services.AddNats(poolSize: 1, configureOpts =>
        {
            return opts;
        });

        services.AddScoped<IHostedTrackingService, HostedTrackingService>();
        services.AddHostedService<ConsumeHostedTrackingService>();
        services.AddScoped<INotificationService, NotificationService.Services.Notification.NotificationService>();
    }
}