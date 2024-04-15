﻿using Microsoft.EntityFrameworkCore;
using TrackingService.Domain.Dictionaries;
using TrackingService.Domain.DTOs;
using TrackingService.Domain.DTOs.Tracking;
using TrackingService.Repositories.Tracking;
using TrackingService.Repositories.Utils;

namespace TrackingService.Services.Tracking;

public class TrackingService : ITrackingService
{
    private readonly ITrackingRepository _trackingRepository;

    public TrackingService(ITrackingRepository trackingRepository)
    {
        _trackingRepository = trackingRepository;
    }

    public async Task<ResponseDto<TrackingWithNotesDto>> GetTrackingById(string id)
    {
        ResponseDto<TrackingWithNotesDto> response = new()
        {
            IsSuccessful = true,
            StatusCode = 200,
            Message = "Seguimiento obtenido exitosamente",
            Data = new List<TrackingWithNotesDto>()
        };

        try
        {
            var tracking = await _trackingRepository.GetTrackingById(id);

            if (tracking is null)
            {
                response.IsSuccessful = false;
                response.StatusCode = 404;
                response.Message = "No existe el seguimiento";
                return response;
            }

            response.Data = new List<TrackingWithNotesDto>()
            {
                tracking
            };

            return response;
        }
        catch (Exception ex)
        {
            // TODO: Add logs
            Console.WriteLine($"GetTrackingById - Error => {ex.Message}");

            response.StatusCode = 500;
            response.Message = "Error al obtener el seguimiento";
            response.IsSuccessful = false;

            return response;
        }
    }

    public async Task<ResponseDto<Domain.Entities.Tracking>> GetTrackingsByTenders(string[] tendersIds)
    {
        ResponseDto<Domain.Entities.Tracking> response = new()
        {
            IsSuccessful = true,
            StatusCode = 200,
            Message = "Seguimientos obtenidos exitosamente",
            Data = new List<Domain.Entities.Tracking>()
        };

        try
        {
            var data = await _trackingRepository.GetTrackingsByTenders(tendersIds);

            if (data is null || !data.Any())
            {
                response.IsSuccessful = false;
                response.StatusCode = 404;
                response.Message = "No hay seguimientos activos para las licitaciones";

                return response;
            }

            response.Data = data;

            return response;
        }
        catch (Exception ex)
        {
            // TODO: Add logs
            Console.WriteLine($"GetTrackingsByTenders - Error => {ex.Message}");

            response.StatusCode = 500;
            response.Message = "Error al obtener los seguimientos";
            response.IsSuccessful = false;

            return response;
        }
    }

    public async Task<ResponseDto<TrackingByUserDto>> GetTrackingsByUser(PaginationDto pagination)
    {
        ResponseDto<TrackingByUserDto> response = new()
        {
            IsSuccessful = true,
            StatusCode = 200,
            Message = "Seguimientos obtenidos exitosamente",
            Data = new List<TrackingByUserDto>()
        };

        try
        {
            var trackings = _trackingRepository.GetTrackingsByUser(pagination.UserId);

            if (trackings is null || !trackings.Any())
            {
                response.IsSuccessful = false;
                response.StatusCode = 404;
                response.Message = "Usuario no tiene seguimientos";
                return response;
            }

            var tenderStatusOptions = TenderStatusOptions.Options;
            var trackingStatusOptions = Domain.Dictionaries.TrackingStatusOptions.Options;

            response.Data = await trackings.OrderBy(tracking => tracking.UpdatedDate)
                .Pagination(pagination)
                .Select(tracking => new TrackingByUserDto
                {
                    Id = tracking.Id,
                    TenderId = tracking.TenderId,
                    TenderStatusId = tracking.TenderStatusId,
                    TenderStatus = tenderStatusOptions.GetValueOrDefault(tracking.TenderStatusId) ?? "",
                    TrackingStatus = trackingStatusOptions.GetValueOrDefault(tracking.TrackingStatusId) ?? "",
                    CreatedDate = tracking.CreatedDate,
                    UpdatedDate = tracking.UpdatedDate
                })
                .ToListAsync();

            return response;
        }
        catch (Exception ex)
        {
            // TODO: Add logs
            Console.WriteLine($"GetTrackingsByUser Error => {ex.Message}");

            response.StatusCode = 500;
            response.Message = "Error al obtener los seguimientos";
            response.IsSuccessful = false;

            return response;
        }
    }

    public async Task SaveAndSendTrackings(List<TendersDto> tenders)
    {
        try
        {
            if (tenders is null || !tenders.Any())
            {
                return;
            }

            var tenderIds = tenders.Select(data => data.id).ToArray();

            if (tenderIds is null || !tenderIds.Any())
            {
                return;
            }

            var trackings = await GetTrackingsByTenders(tenderIds);

            if (trackings is null || !trackings.Data.Any())
            {
                return;
            }

            foreach (var tracking in trackings.Data)
            {
                await CreateTracking(tracking.TenderId, tracking.UserId);
            }

            var payload = new List<NotificationDto>();

        }
        catch (Exception ex)
        {
            // TODO: Add logs
            Console.WriteLine(ex.ToString());
        }
    }

    public async Task<ResponseDto<Domain.Entities.Tracking>> CreateTracking(string tenderId, string userId)
    {
        ResponseDto<Domain.Entities.Tracking> response = new()
        {
            IsSuccessful = true,
            StatusCode = 200,
            Message = "Seguimiento creado exitosamente",
            Data = new List<Domain.Entities.Tracking>()
        };

        try
        {
            // TODO: validate tenderId

            var trackings = await _trackingRepository.GetTrackingsByUser(userId).ToListAsync();

            if (ExistsTrackingForTender(trackings, tenderId))
            {
                response.StatusCode = 400;
                response.IsSuccessful = false;
                response.Message = $"Ya existe un seguimiento en curso para la licitación {tenderId}";
                return response;
            }

            Domain.Entities.Tracking newTracking = new()
            {
                Id = Guid.NewGuid().ToString(),
                TenderId = tenderId,
                UserId = userId,
                TrackingStatusId = (int)Domain.Enums.TrackingStatusOptions.Created
            };
        
            await _trackingRepository.CreateTracking(tracking: newTracking);

            response.Data = new List<Domain.Entities.Tracking>()
            {
                newTracking
            };

            return response;
        }
        catch (Exception ex)
        {   
            // TODO: Add logs
            Console.WriteLine(ex.ToString());

            response.StatusCode = 500;
            response.Message = $"Error al crear el seguimiento para la licitación {tenderId}";
            response.IsSuccessful = false;

            return response;
        }
    }

    private static bool ExistsTrackingForTender(ICollection<Domain.Entities.Tracking> trackings, string tenderId)
    {
        if (trackings is null)
        {
            return false;
        }

        return trackings.Where(tracking => tracking.TenderId == tenderId
                         && tracking.TrackingStatusId != (int)Domain.Enums.TrackingStatusOptions.Deleted)
                        .Any();
    }

    public Task SaveAndSendTrackings(TendersDto tenders)
    {
        throw new NotImplementedException();
    }

    public async Task<ResponseDto<Domain.Entities.Tracking>> UpdateTracking(Domain.Entities.Tracking tracking)
    {
        ResponseDto<Domain.Entities.Tracking> response = new()
        {
            IsSuccessful = true,
            StatusCode = 200,
            Message = "Seguimiento actualizado exitosamente",
            Data = new List<Domain.Entities.Tracking>()
        };

        try
        {
            // TODO: validate tenderId

            var trackingResult = await _trackingRepository.UpdateTracking(tracking);

            response.Data = new List<Domain.Entities.Tracking>()
            {
                trackingResult
            };

            return response;
        }
        catch (Exception ex)
        {
            // TODO: Add logs
            Console.WriteLine(ex.ToString());

            response.StatusCode = 500;
            response.Message = $"Error al actualizar el seguimiento";
            response.IsSuccessful = false;

            return response;
        }
    }
}
