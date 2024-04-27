
namespace NotificationService.Repositories.Notification
{
    public class NotificationRepository : INotificationRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public NotificationRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IQueryable<Domain.Entities.Notification> GetNotifications(string UserId)
        {
            return _dbContext.Notifications.Where(notification => notification.UserId == UserId).AsQueryable();
        }

        public async Task<List<Domain.Entities.Notification>> SaveNotifications(List<Domain.Entities.Notification> notifications)
        {
            await _dbContext.AddRangeAsync(notifications);
            await _dbContext.SaveChangesAsync();

            return notifications;
        }

        public async Task<List<Domain.Entities.Notification>> UpdateNotifications(List<Domain.Entities.Notification> notification)
        {
            _dbContext.UpdateRange(notification);
            await _dbContext.SaveChangesAsync();

            return notification;
        }
    }
}
