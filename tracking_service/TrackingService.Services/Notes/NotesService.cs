using Microsoft.EntityFrameworkCore;
using TrackingService.Domain.DTOs;
using TrackingService.Domain.DTOs.Note;
using TrackingService.Domain.Entities;
using TrackingService.Repositories.Notes;
using TrackingService.Repositories.Utils;
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

        public async Task<ResponseDto<NotesByTrackingDto>> GetTrackingNotes(NotePaginationDto pagination)
        {
            ResponseDto<NotesByTrackingDto> response = new()
            {
                IsSuccessful = true,
                StatusCode = 200,
                Message = "Notas obtenidas correctamente",
                Data = new NotesByTrackingDto()
            };

            try
            {
                var notes = _notesRepository.GetTrackingNotes(pagination.TrackingId);

                if (notes is null || !notes.Any())
                {
                    response.IsSuccessful = false;
                    response.StatusCode = 404;
                    response.Message = "Seguimiento no tiene notas";
                    return response;
                }

                int notesCount = notes.Count();
                response.Data.TotalNotes = notesCount;
                response.Data.OutputNotes = await notes.OrderBy(note => note.UpdatedDate)
                    .NotesPagination(pagination).ToListAsync();

                return response;
            }
            catch (Exception ex)
            {
                // TODO: ADD LOGS
                Console.WriteLine($"GetTrackingNotes Error => {ex.Message}");
                response.StatusCode = 500;
                response.Message = "Error al obtener las notas del seguimiento";
                response.IsSuccessful = false;
                return response;
            }
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
                var tracking = await _trackingService.GetTrackingById(notes.TrackingId);

                if (!tracking.IsSuccessful || tracking.Data is null || !tracking.Data.Any())
                {
                    response.IsSuccessful = false;
                    response.StatusCode = 404;
                    response.Message = $"Seguimiento {notes.TrackingId} no existe";
                    return response;
                }

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

        public async Task<ResponseDto<Domain.Entities.Notes>> UpdateNotes(string trackingId, string noteId, string newNote)
        {
            ResponseDto<Domain.Entities.Notes> response = new()
            {
                IsSuccessful = true,
                StatusCode = 200,
                Message = "Notas actualizada correctamente",
                Data = new Domain.Entities.Notes()
            };

            try
            {
                var note = _notesRepository.GetNoteById(noteId, trackingId);

                if (note is null)
                {
                    response.StatusCode = 404;
                    response.IsSuccessful = false;
                    response.Message = $"La nota {noteId} no existe";
                    return response;
                }

                note.Description = newNote;
                note.UpdatedDate = DateTime.UtcNow;
                response.Data = await _notesRepository.UpdateNode(note);

                return response;
            }
            catch (Exception ex)
            {
                // TODO: ADD LOGS
                Console.WriteLine($"UpdateNotes Error => {ex.Message}");
                response.StatusCode = 500;
                response.Message = "Error al actualizar la nota para el seguimiento";
                response.IsSuccessful = false;
                return response;
            }
        }

        public async Task<ResponseDto<Domain.Entities.Notes>> DeleteNote(string trackingId, string noteId)
        {
            ResponseDto<Domain.Entities.Notes> response = new()
            {
                IsSuccessful = true,
                StatusCode = 200,
                Message = "Notas borrada correctamente",
                Data = new Domain.Entities.Notes()
            };

            try
            {
                var note = _notesRepository.GetNoteById(noteId, trackingId);

                if (note is null)
                {
                    response.StatusCode = 404;
                    response.IsSuccessful = false;
                    response.Message = $"La nota {noteId} no existe";
                    return response;
                }

                response.Data = await _notesRepository.DeleteNote(note);

                return response;
            }
            catch (Exception ex)
            {
                // TODO: ADD LOGS
                Console.WriteLine($"DeleteNote Error => {ex.Message}");
                response.StatusCode = 500;
                response.Message = "Error al borrar la nota para el seguimiento";
                response.IsSuccessful = false;
                return response;
            }
        }

        public async Task<ResponseDto<Domain.Entities.Notes>> GetNoteById(string id, string noteId)
        {
            ResponseDto<Domain.Entities.Notes> response = new()
            {
                IsSuccessful = true,
                StatusCode = 200,
                Message = "Notas obtenida correctamente",
                Data = new Domain.Entities.Notes()
            };

            try
            {
                var note = _notesRepository.GetNoteById(noteId, id);

                if (note is null)
                {
                    response.StatusCode = 404;
                    response.IsSuccessful = false;
                    response.Message = $"La nota {noteId} no existe";
                    return response;
                }

                response.Data = note;

                return response;
            }
            catch (Exception ex)
            {
                // TODO: ADD LOGS
                Console.WriteLine($"GetNoteById Error => {ex.Message}");
                response.StatusCode = 500;
                response.Message = "Error al obtener la nota";
                response.IsSuccessful = false;
                return response;
            }
        }
    }
}
