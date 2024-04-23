namespace TrackingService.Domain.DTOs.Tracking
{
    public class TrackingByUserDto
    {
        public int TotalTrackings { get; set; }
        public IEnumerable<OutputTracking> OutputTrackings { get; set; }
    }

    public class OutputTracking
    {
        public string Id { get; set; }
        public string TenderId { get; set; }
        public int TenderStatusId { get; set; }
        public string TenderStatus { get; set; }
        public string TrackingStatus { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedDate { get; set; }
    }
}
