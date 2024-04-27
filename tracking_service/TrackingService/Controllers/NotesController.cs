using Microsoft.AspNetCore.Mvc;
using TrackingService.Domain.DTOs;
using TrackingService.Domain.DTOs.Note;
using TrackingService.Domain.Entities;
using TrackingService.Services.Notes;

namespace TrackingServiceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotesController : ControllerBase
    {
        private readonly INotesService _notesService;

        public NotesController(INotesService _notesService)
        {
            this._notesService = _notesService;
        }

        [HttpGet("{id}/{noteId}")]
        public async Task<ResponseDto<Notes>> GetNoteById(string id, string noteId)
        {
            return await _notesService.GetNoteById(id, noteId);
        }

        [HttpGet]
        public async Task<ResponseDto<NotesByTrackingDto>> GetTrackingNotes([FromQuery] NotePaginationDto paginationDto)
        {
            return await _notesService.GetTrackingNotes(paginationDto);
        }

        [HttpPost]
        public async Task<ResponseDto<List<Notes>>> Create([FromBody] NoteDto notes)
        {
            return await _notesService.CreateNotes(notes);
        }

        [HttpPut]
        public async Task<ResponseDto<Notes>> Update([FromHeader] string trackingId, [FromHeader] string noteId, [FromHeader] string newNote)
        {
            return await _notesService.UpdateNotes(trackingId, noteId, newNote);
        }

        [HttpDelete]
        public async Task<ResponseDto<Notes>> Delete([FromHeader] string trackingId, [FromHeader]  string noteId)
        {
            return await _notesService.DeleteNote(trackingId, noteId);
        }
    }
}