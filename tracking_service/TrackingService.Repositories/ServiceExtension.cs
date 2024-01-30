using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TrackingService.Domain.Entities;
using TrackingService.Domain.Enums;
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

        //var fakeTrackings = CreateFakeTrackings();

        //foreach (var fakeTracking in fakeTrackings)
        //{
        //    test.Add(fakeTracking);
        //}

        List<TenderStatus> tenderStatuses = new()
        {
            new TenderStatus
            {
                Id = 5,
                Name = "Publicada",
                CreatedDate = DateTime.Now,
                IsActive = true,
            },
            new TenderStatus
            {
                Id = 6,
                Name = "Cerrada",
                CreatedDate = DateTime.Now,
                IsActive = true,
            },
            new TenderStatus
            {
                Id = 7,
                Name = "Desierta",
                CreatedDate = DateTime.Now,
                IsActive = true,
            },
            new TenderStatus
            {
                Id = 8,
                Name = "Adjudicada",
                CreatedDate = DateTime.Now,
                IsActive = true,
            },
            new TenderStatus
            {
                Id = 18,
                Name = "Revocada",
                CreatedDate = DateTime.Now,
                IsActive = true,
            },
            new TenderStatus
            {
                Id = 19,
                Name = "Suspendida",
                CreatedDate = DateTime.Now,
                IsActive = true,
            }
        };

        test.Add(tenderStatuses);

        test.SaveChanges();

        services.AddScoped<ITrackingRepository, TrackingRepository>();
    }

    public static List<Domain.Entities.Tracking> CreateFakeTrackings()
    {
        List<Domain.Entities.Tracking> fakeTrackings = new()
        {
            new Domain.Entities.Tracking
            {
                Id = Guid.NewGuid().ToString(),
                TenderId = "1021609-21-LP23",
                UserId = "nicolas.fernandez.r@usach.cl",
                TrackingStatusId = (int)TrackingStatusOptions.Created
            },
            new Domain.Entities.Tracking
            {
                Id = Guid.NewGuid().ToString(),
                TenderId = "1021609-21-LP23",
                UserId = "martin.cespedes@usach.cl",
                TrackingStatusId = (int)TrackingStatusOptions.Created
            },
            new Domain.Entities.Tracking
            {
                Id = Guid.NewGuid().ToString(),
                TenderId = "1024-22-LQ23",
                UserId = "martin.cespedes@usach.cl",
                TrackingStatusId = (int)TrackingStatusOptions.Created
            },
            new Domain.Entities.Tracking
            {
                Id = Guid.NewGuid().ToString(),
                TenderId = "1024-26-LE23",
                UserId = "nicolas.fernandez.r@usach.cl",
                TrackingStatusId = (int)TrackingStatusOptions.Created
            },
            new Domain.Entities.Tracking
            {
                Id = Guid.NewGuid().ToString(),
                TenderId = "1024-36-LE23",
                UserId = "martin.cespedes@usach.cl",
                TrackingStatusId = (int)TrackingStatusOptions.Created
            },
            new Domain.Entities.Tracking
            {
                Id = Guid.NewGuid().ToString(),
                TenderId = "1024-37-LE23",
                UserId = "martin.cespedes@usach.cl",
                TrackingStatusId = (int)TrackingStatusOptions.Created
            },
            new Domain.Entities.Tracking
            {
                Id = Guid.NewGuid().ToString(),
                TenderId = "1026-22-LP23",
                UserId = "nicolas.fernandez.r@usach.cl",
                TrackingStatusId = (int)TrackingStatusOptions.Created
            },
            new Domain.Entities.Tracking
            {
                Id = Guid.NewGuid().ToString(),
                TenderId = "1000-25-LE23",
                UserId = "nicolas.fernandez.r@usach.cl",
                TrackingStatusId = (int)TrackingStatusOptions.Created
            },
            new Domain.Entities.Tracking
            {
                Id = Guid.NewGuid().ToString(),
                TenderId = "1000813-43-LE23",
                UserId = "nicolas.fernandez.r@usach.cl",
                TrackingStatusId = (int)TrackingStatusOptions.Created
            },
        };

        return fakeTrackings;
    }
}
