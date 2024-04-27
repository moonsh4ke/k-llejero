using TrackingService.Domain.DTOs;
using TrackingService.Domain.DTOs.Note;

namespace TrackingService.Services.Notes
{
    public interface INotesService
    {
        public Task<ResponseDto<Domain.Entities.Notes>> GetNoteById(string id, string noteId);
        public Task<ResponseDto<NotesByTrackingDto>> GetTrackingNotes(NotePaginationDto pagination);
        public Task<ResponseDto<List<Domain.Entities.Notes>>> CreateNotes(NoteDto notes);
        public Task<ResponseDto<Domain.Entities.Notes>> UpdateNotes(string trackingId, string noteId, string newNote);
        public Task<ResponseDto<Domain.Entities.Notes>> DeleteNote(string trackingId, string noteId);
    }
}