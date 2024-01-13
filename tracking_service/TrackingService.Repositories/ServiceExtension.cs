using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TrackingService.Repositories.Tracking;

namespace TrackingService.Repositories;

public static class ServiceExtension
{
    public static void AddTrackingServiceRepository(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING") ?? configuration.GetConnectionString("DefaultConnection");

        services.AddDbContext<ApplicationDbContext>(options =>
        {
            options.UseMySQL(connectionString);
        });

        services.AddScoped<ITrackingRepository, TrackingRepository>();
    }
}
