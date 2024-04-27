namespace TrackingService.Domain.DTOs.Note
{
    public class NotesByTrackingDto
    {
        public int TotalNotes { get; set; }
        public IEnumerable<Entities.Notes> OutputNotes { get; set; }
    }
}
