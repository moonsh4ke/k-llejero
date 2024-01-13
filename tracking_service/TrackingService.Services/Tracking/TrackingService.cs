using NATS.Client.Core;
using TrackingService.Domain.DTOs;
using TrackingService.Domain.DTOs.Tracking;
using TrackingService.Domain.Enums;
using TrackingService.Repositories.Tracking;

namespace TrackingService.Services.Tracking;

public class TrackingService : ITrackingService
{
    private readonly INatsConnection _connection;
    private readonly ITrackingRepository _trackingRepository;

    public TrackingService(INatsConnection connection, ITrackingRepository trackingRepository)
    {
        _connection = connection;
        _trackingRepository = trackingRepository;
    }

    public async Task<ResponseDto<TrackingByTendersDto>> GetTrackingsByTenders(string[] tendersIds)
    {
        ResponseDto<TrackingByTendersDto> response = new()
        {
            IsSuccessful = true,
            StatusCode = 200,
            Message = "Seguimientos obtenidos exitosamente",
            Data = new List<TrackingByTendersDto>()
        };

        try
        {
            var data = await _trackingRepository.GetTrackingsByTenders(tendersIds);

            if (data is null || !data.Any())
            {
                response.IsSuccessful = false;
                response.StatusCode = 404;
                response.Message = "No hay seguimientos activos para las licitaciones";
            }

            response.Data = data;
            return response;
        }
        catch (Exception ex)
        {
            // TODO: Add logs
            Console.WriteLine(ex.ToString());

            response.StatusCode = 500;
            response.Message = "Error al obtener los seguimientos";
            response.IsSuccessful = false;

            return response;
        }
    }

    public async Task<ResponseDto<Domain.Entities.Tracking>> GetTrackingsByUser(string userId)
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
            var trackings = await _trackingRepository.GetTrackingsByUser(userId);
            response.Data = trackings;

            if (!trackings.Any())
            {
                response.IsSuccessful = false;
                response.StatusCode = 404;
                response.Message = "Usuario no tiene seguimientos";
            }

            return response;
        }
        catch (Exception ex)
        {
            // TODO: Add logs
            Console.WriteLine(ex.ToString());

            response.StatusCode = 500;
            response.Message = "Error al obtener los seguimientos";
            response.IsSuccessful = false;

            return response;
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

            var trackings = await _trackingRepository.GetTrackingsByUser(userId);

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
                TrackingStatusId = (int)TrackingStatusOptions.Created
            };
        
            await _trackingRepository.CreateTracking(tracking: newTracking);

            /*
            var xd = await _connection.SubscribeCoreAsync<string>("tender:update");

            await foreach (var msg in xd.Msgs.ReadAllAsync())
            {
                Console.WriteLine($"Received {msg.Subject}: {msg.Data}\n");
            }
            */

            // TODO: notify NotificationsAPI
            //await _connection.PublishAsync("tracking:created", $"{tenderId}");

            // wait for notification to be created

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
                         && tracking.TrackingStatusId != (int)TrackingStatusOptions.Deleted)
                        .Any();
    }
}
