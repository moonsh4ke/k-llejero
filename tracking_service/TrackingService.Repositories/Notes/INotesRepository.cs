namespace TrackingService.Repositories.Notes
{
    public interface INotesRepository
    {
        public Task<List<Domain.Entities.Notes>> SaveNotes(List<Domain.Entities.Notes> notes);
    }
}
