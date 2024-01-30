namespace TrackingService.Domain.Entities
{
    public class TenderStatus
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedDate { get; set; }
        public bool IsActive { get; set; }
    }
}