﻿namespace TrackingService.Repositories;

using Microsoft.EntityFrameworkCore;
using TrackingService.Domain.Entities;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions options) : base(options) { }

    public DbSet<Domain.Entities.Tracking> Trackings { get; set; }
    public DbSet<CategoryTracking> TrackingCategories { get; set; }
    public DbSet<Domain.Entities.Notes> Notes { get; set; }
    public DbSet<TrackingStatus> TrackingStatus { get; set; }
}