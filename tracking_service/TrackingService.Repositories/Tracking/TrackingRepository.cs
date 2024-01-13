using Microsoft.EntityFrameworkCore;
using System.Linq;
using TrackingService.Domain.DTOs.Tracking;
using TrackingService.Domain.Enums;

namespace TrackingService.Repositories.Tracking;
public class TrackingRepository : ITrackingRepository
{
    private readonly ApplicationDbContext _dbContext;

    public TrackingRepository(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Domain.Entities.Tracking> CreateTracking(Domain.Entities.Tracking tracking)
    {
        await _dbContext.AddAsync(tracking);
        await _dbContext.SaveChangesAsync();

        return tracking;
    }

    public async Task<ICollection<TrackingByTendersDto>> GetTrackingsByTenders(string[] tendersIds)
    {
        var query = await (from tracking in _dbContext.Trackings
                     where tendersIds.Contains(tracking.TenderId)
                     && tracking.TrackingStatusId != (int)TrackingStatusOptions.Deleted
                     select new TrackingByTendersDto
                     {
                         TrackingId = tracking.Id,
                         TenderId = tracking.TenderId,
                         UserEmail = tracking.UserId
                     })
                     .ToListAsync();

        return query;
    }

    public async Task<ICollection<Domain.Entities.Tracking>> GetTrackingsByUser(string userId)
    {
        return await _dbContext.Trackings
            .Where(tracking => tracking.UserId == userId)
            .ToListAsync();
    }
}
