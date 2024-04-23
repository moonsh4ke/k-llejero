using TrackingService.Domain.DTOs;
using TrackingService.Domain.DTOs.Note;
using TrackingService.Repositories.Notes;
using TrackingService.Services.Tracking;

namespace TrackingService.Services.Notes
{
    public class NotesService : INotesService
    {
        private readonly ITrackingService _trackingService;
        private readonly INotesRepository _notesRepository;

        public NotesService(ITrackingService _trackingService, INotesRepository _notesRepository) 
        {
            this._trackingService = _trackingService;
            this._notesRepository = _notesRepository;
        }

        public async Task<ResponseDto<List<Domain.Entities.Notes>>> CreateNotes(NoteDto notes)
        {
            ResponseDto<List<Domain.Entities.Notes>> response = new()
            {
                IsSuccessful = true,
                StatusCode = 200,
                Message = "Notas creadas correctamente",
                Data = new List<Domain.Entities.Notes>()
            };

            try
            {
                var tracking = _trackingService.GetTrackingById(notes.TrackingId);

                if (notes is null || notes.Notes is null || !notes.Notes.Any())
                {
                    response.IsSuccessful = false;
                    response.StatusCode = 400;
                    response.Message = "Petición inválida";
                    return response;
                }

                List<Domain.Entities.Notes> notesToAdd = new();

                foreach (var note in notes.Notes)
                {
                    Domain.Entities.Notes newNote = new()
                    {
                        Id = Guid.NewGuid().ToString(),
                        TrackingId = notes.TrackingId,
                        Description = note,
                        CreatedDate = DateTime.UtcNow,
                    };
                    notesToAdd.Add(newNote);
                }

                await _notesRepository.SaveNotes(notesToAdd);

                return response;
            } 
            catch (Exception ex)
            {
                // TODO: ADD LOGS
                Console.WriteLine($"CreateNotes Error => {ex.Message}");
                response.StatusCode = 500;
                response.Message = "Error al crear las notas para el seguimiento";
                response.IsSuccessful = false;
                return response;
            }
        }

        public async Task<ResponseDto<List<Domain.Entities.Notes>>> UpdateNotes(List<Domain.Entities.Notes> notes)
        {
            throw new NotImplementedException();
        }
    }
}
