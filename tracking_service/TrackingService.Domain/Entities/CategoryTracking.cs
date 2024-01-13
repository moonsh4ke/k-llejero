namespace TrackingService.Domain.Entities
{
    public class CategoryTracking
    {
        public string Id { get; set; }
        public string TrackingId { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedDate { get; set; }
    }
}
