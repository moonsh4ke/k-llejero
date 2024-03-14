namespace TrackingService.Repositories.Notes
{
    public class NotesRepository : INotesRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public NotesRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Domain.Entities.Notes>> SaveNotes(List<Domain.Entities.Notes> notes)
        {
            await _dbContext.AddRangeAsync(notes);
            await _dbContext.SaveChangesAsync();
            return notes;
        }
    }
}
