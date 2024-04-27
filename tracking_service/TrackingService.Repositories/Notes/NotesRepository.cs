


namespace TrackingService.Repositories.Notes
{
    public class NotesRepository : INotesRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public NotesRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IQueryable<Domain.Entities.Notes> GetTrackingNotes(string trackingId)
        {
            return _dbContext.Notes.Where(note => note.TrackingId == trackingId).AsQueryable();
        }

        public Domain.Entities.Notes GetNoteById(string noteId, string trackingId)
        {
            return _dbContext.Notes.Where(note => note.TrackingId == trackingId && note.Id == noteId).FirstOrDefault();
        }

        public async Task<List<Domain.Entities.Notes>> SaveNotes(List<Domain.Entities.Notes> notes)
        {
            await _dbContext.AddRangeAsync(notes);
            await _dbContext.SaveChangesAsync();
            return notes;
        }

        public async Task<Domain.Entities.Notes> UpdateNode(Domain.Entities.Notes note)
        {
            _dbContext.Update(note);
            await _dbContext.SaveChangesAsync();
            return note;
        }

        public async Task<Domain.Entities.Notes> DeleteNote(Domain.Entities.Notes note)
        {
            _dbContext.Notes.Remove(note);
            await _dbContext.SaveChangesAsync();
            return note;
        }
    }
}
