namespace TrackingService.Domain.Entities
{
    public class Notes
    {
        public Guid Id { get; set; }
        public Guid TrackingId { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedDate { get; set; }
    }
}
