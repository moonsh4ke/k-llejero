using System.Linq;

namespace NotificationService.Repositories.Notification;

public interface INotificationRepository
{
    IQueryable<Domain.Entities.Notification> GetNotifications(string UserId);
    Task<List<Domain.Entities.Notification>> SaveNotifications(List<Domain.Entities.Notification> notification);
    Task<List<Domain.Entities.Notification>> UpdateNotifications(List<Domain.Entities.Notification> notification);
}
