namespace NotificationService.Domain.Entities;

public class Notification
{
    public string Id { get; set; }
    public string TenderId { get; set; }
    public string UserId { get; set; }
    public string Content { get; set; }
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    public bool Readed { get; set; }
}
