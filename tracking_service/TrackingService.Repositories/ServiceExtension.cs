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


        // TODO: FIX IT
        var test = services.BuildServiceProvider().GetRequiredService<ApplicationDbContext>();

        test.Database.Migrate();

        services.AddScoped<ITrackingRepository, TrackingRepository>();
    }
}
