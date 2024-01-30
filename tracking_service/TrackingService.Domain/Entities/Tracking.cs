namespace TrackingService.Domain.Entities
{
    public class Tracking
    {
        public string Id { get; set; }
        public string TenderId { get; set; }
        public string UserId { get; set; }
        public int TenderStatusId {  get; set; }
        public int TrackingStatusId { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedDate { get; set; }
    }
}
