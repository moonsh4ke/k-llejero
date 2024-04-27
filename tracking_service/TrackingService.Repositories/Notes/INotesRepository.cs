namespace TrackingService.Repositories.Notes
{
    public interface INotesRepository
    {
        public IQueryable<Domain.Entities.Notes> GetTrackingNotes(string trackingId);
        public Domain.Entities.Notes GetNoteById(string noteId, string trackingId);
        public Task<List<Domain.Entities.Notes>> SaveNotes(List<Domain.Entities.Notes> notes);
        public Task<Domain.Entities.Notes> UpdateNode(Domain.Entities.Notes note);
        public Task<Domain.Entities.Notes> DeleteNote(Domain.Entities.Notes note);
    }
}
