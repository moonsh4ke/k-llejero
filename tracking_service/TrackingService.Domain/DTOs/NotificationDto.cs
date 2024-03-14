namespace TrackingService.Domain.DTOs;

public class NotificationDto
{
    public string TrackingId { get; set; }
    public string TenderId { get; set; }
    public string UserId { get; set; }
    public string TenderNewState { get; set; }
    public int TenderNewStateId { get; set; }

}
