using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace NotificationService.Repositories
{
    public static class ServiceExtension
    {
        public static void AddNotificationServiceRepository(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING") ?? configuration.GetConnectionString("DefaultConnection");

            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseMySQL(connectionString);
            });
        }
    }
}
