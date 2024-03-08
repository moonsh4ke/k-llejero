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
            await _dbContext.AddAsync(notifications);
            await _dbContext.SaveChangesAsync();

            return notifications;
        }
    }
}
