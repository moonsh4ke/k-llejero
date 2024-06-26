﻿namespace TrackingService.Repositories.Tracking;

using TrackingService.Domain.DTOs.Tracking;
using TrackingService.Domain.Entities;

public interface ITrackingRepository
{
    public Task<TrackingDto> GetTrackingById(string trackingId);
    public Task<Tracking> GetTracking(string id);
    public Task<ICollection<Tracking>> GetTrackingsByTenders(string[] tendersIds);
    public Task<Tracking> UpdateTracking(Tracking tracking);
    public IQueryable<Tracking> GetTrackingsByUser(string userId);
    public Task<Tracking> CreateTracking(Tracking tracking);

    public Task<Tracking> DeleteTracking(Tracking tracking);
}
