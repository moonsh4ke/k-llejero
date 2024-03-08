using Microsoft.EntityFrameworkCore;

namespace NotificationService.Repositories
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options) { }
        public DbSet<Domain.Entities.Notification> Notifications { get; set; }
    }
}
