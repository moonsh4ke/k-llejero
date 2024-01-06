namespace TrackingService.Domain.Entities
{
    public class CategoryTracking
    {
        public Guid Id { get; set; }
        public Guid TrackingId { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedDate { get; set; }
    }
}
