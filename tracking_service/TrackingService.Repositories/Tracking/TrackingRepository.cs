using Microsoft.EntityFrameworkCore;

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

    public async Task<Domain.Entities.Tracking> GetTrackingById(string trackingId)
    {
        /*
        var query = (from tracking in _dbContext.Trackings
                     join notes in _dbContext.Notes
                     where tracking.Id == trackingId &&
                     notes.);
        */
        return await _dbContext.Trackings.Where(tracking => tracking.Id == trackingId).FirstOrDefaultAsync();
    }

    public async Task<ICollection<Domain.Entities.Tracking>> GetTrackingsByTenders(string[] tendersIds)
    {
        var query = await _dbContext.Trackings.Where(tracking => tendersIds.Contains(tracking.Id)).ToListAsync();
        /*
        var query = await (from tracking in _dbContext.Trackings
                           join tenderStatus in _dbContext.TenderStatus join tracking.TenderStatusId equals tenderStatus.Id
                           where tendersIds.Contains(tracking.TenderId)
                     && tracking.TrackingStatusId != (int)Domain.Enums.TrackingStatusOptions.Deleted
                     select new TrackingByTendersDto
                     {
                         TrackingId = tracking.Id,
                         TenderId = tracking.TenderId,
                         TenderStatus = tenderStatus.Name "ESTADO",
                         UserEmail = tracking.UserId
                     })
                     .ToListAsync();
        */

        return query;
    }

    public IQueryable<Domain.Entities.Tracking> GetTrackingsByUser(string userId)
    {
        var query = (from tracking in _dbContext.Trackings
                           where tracking.UserId == userId
                           select new Domain.Entities.Tracking
                           {
                              Id = tracking.Id,
                              UserId = userId,
                              TenderId = tracking.TenderId,
                              TenderStatusId = tracking.TenderStatusId,
                              TrackingStatusId = tracking.TrackingStatusId,
                              CreatedDate = tracking.CreatedDate,
                              UpdatedDate = tracking.UpdatedDate
                           }).AsQueryable();
        return query;
    }

    public async Task<Domain.Entities.Tracking> UpdateTracking(Domain.Entities.Tracking tracking)
    {
        await _dbContext.AddAsync(tracking);
        await _dbContext.SaveChangesAsync();

        return tracking;
    }
}
