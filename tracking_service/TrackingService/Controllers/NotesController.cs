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

        [HttpPost]
        public async Task<ResponseDto<List<Notes>>> Create(NoteDto notes)
        {
            return await _notesService.CreateNotes(notes);
        }

        [HttpPut]
        public async Task<ResponseDto<List<Notes>>> Update(List<Notes> notes)
        {
            return await _notesService.UpdateNotes(notes);
        }
    }
}