﻿using TrackingService.Domain.DTOs;
using TrackingService.Domain.DTOs.Note;

namespace TrackingService.Services.Notes
{
    public interface INotesService
    {
        public Task<ResponseDto<List<Domain.Entities.Notes>>> CreateNotes(NoteDto notes);
        public Task<ResponseDto<List<Domain.Entities.Notes>>> UpdateNotes(List<Domain.Entities.Notes> notes);
    }
}