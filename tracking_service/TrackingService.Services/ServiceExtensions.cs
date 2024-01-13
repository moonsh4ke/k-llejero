﻿using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NATS.Client.Core;
using NATS.Client.Hosting;
using TrackingService.Services.Tender;
using TrackingService.Services.Tracking;

namespace TrackingService.Services;

public static class ServiceExtensions
{
    // Extension method https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/extension-methods
    public static void AddTrackingServiceServices(this IServiceCollection services, IConfiguration configuration)
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

        services.AddScoped<ITrackingService, Tracking.TrackingService>();
        services.AddScoped<IHostedTenderService, HostedTenderService>();
        services.AddHostedService<ConsumeHostedTenderService>();
    }
}