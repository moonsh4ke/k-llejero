using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NATS.Client.Core;
using NATS.Client.Hosting;
using NotificationService.Services.Tracking;

namespace NotificationService.Services;

public static class ServiceExtensions
{
    public static void AddNotificationServiceServices(this IServiceCollection services, IConfiguration configuration)
    {
        NatsOpts opts = new()
        {
            Url = "nats://nats:4222"
        };

        // Add nats
        services.AddNats(poolSize: 1, configureOpts =>
        {
            return opts;
        });

        services.AddScoped<IHostedTrackingService, HostedTrackingService>();
        services.AddHostedService<ConsumeHostedTrackingService>();
    }
}