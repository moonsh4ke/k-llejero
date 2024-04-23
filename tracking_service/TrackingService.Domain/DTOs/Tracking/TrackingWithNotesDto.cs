using TrackingService.Domain.Entities;

namespace TrackingService.Domain.DTOs.Tracking
{
    public class TrackingWithNotesDto
    {
        public string Id { get; set; }
        public string TenderId { get; set; }
        public string TenderStatus { get; set; }
        public string TrackingStatus { get; set; }
        public List<Notes> Notes { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedDate { get; set; }
    }
}
