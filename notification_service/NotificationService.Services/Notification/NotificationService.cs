using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using NotificationService.Domain.DTOs;
using NotificationService.Repositories.Notification;
using NotificationService.Repositories.Utils;

namespace NotificationService.Services.Notification
{
    public class NotificationService : INotificationService
    {
        private readonly INotificationRepository _notificationRepository;
        private readonly IHubContext<NotificationHub> _notificationHubContext;

        public NotificationService(INotificationRepository notificationRepository, IHubContext<NotificationHub> notificationHubContext)
        {
            _notificationRepository = notificationRepository;
            _notificationHubContext = notificationHubContext;
        }

        public async Task<ResponseDto<Domain.Entities.Notification>> GetNotifications(PaginationDto paginationDto)
        {
            ResponseDto<Domain.Entities.Notification> response = new()
            {
                IsSuccessful = true,
                StatusCode = 200,
                Message = "Notificaciones obtenidas exitosamente",
                Data = new List<Domain.Entities.Notification>()
            };

            try
            {
                var notifications = _notificationRepository.GetNotifications(paginationDto.UserId);
                response.Data = await notifications.OrderBy(notification => notification.CreatedDate).Pagination(paginationDto).ToListAsync();
                return response;
            }
            catch (Exception ex)
            {
                // TODO: Add logs
                Console.WriteLine($"GetNotifications - {ex.Message}");
                response.StatusCode = 500;
                response.IsSuccessful = false;
                response.Message = "Error al obtener las notificaciones";
                return response;
            }
        }

        public async Task SaveAndSendNotifications(List<TrackingDto> trackings)
        {
            try
            {
                Console.WriteLine($"SaveAndSendNotifications - trackings.COUNT => {trackings.Count}");
                var response = await SaveNotifications(trackings);

                if (!response.IsSuccessful)
                {
                    Console.WriteLine($"SaveAndSendNotifications - {response.Message}");
                    return;
                }

                await SendNotifications(response.Data.ToList());
            }
            catch (Exception ex)
            {
                // TODO: Add logs
                Console.WriteLine($"SaveAndSendNotifications - {ex.Message}");
            }
        }

        public async Task<ResponseDto<Domain.Entities.Notification>> SaveNotifications(List<TrackingDto> trackings)
        {
            ResponseDto<Domain.Entities.Notification> response = new()
            {
                IsSuccessful = true,
                StatusCode = 200,
                Message = "Notificación guardada exitosamente",
                Data = new List<Domain.Entities.Notification>()
            };

            try
            {
                List<Domain.Entities.Notification> notifications = new();
                
                if (IsListValid(trackings))
                {
                    Console.WriteLine($"SaveNotifications - LIST NOT VALID");
                    response.IsSuccessful = false;
                    response.StatusCode = 404;
                    response.Message = "No hay seguimientos activos para las licitaciones";

                    return response;
                }

                foreach (TrackingDto tracking in trackings)
                {
                    Domain.Entities.Notification notification = new()
                    {
                        Id = Guid.NewGuid().ToString(),
                        TenderId = tracking.TenderId,
                        UserId = tracking.UserId,
                        Content = $"Cambió de estado a {tracking.TenderNewState}",
                        TenderStatus = tracking.TenderNewStateId,
                        CreatedDate = DateTime.UtcNow,
                        Readed = false,
                    };
                    notifications.Add(notification);
                }
              
                var data = await _notificationRepository.SaveNotifications(notifications);

                if (IsListValid(data))
                {
                    Console.WriteLine($"SaveNotifications - DATA LIST NOT VALID");
                    response.IsSuccessful = false;
                    response.StatusCode = 404;
                    response.Message = "No hay seguimientos activos para las licitaciones";

                    return response;
                }

                response.Data = notifications;

                return response;
            }
            catch (Exception ex)
            {
                // TODO: Add logs
                Console.WriteLine($"SaveNotifications - {ex.Message}");

                response.StatusCode = 500;
                response.Message = "Error al guardar la notificación";
                response.IsSuccessful = false;

                return response;
            }
        }

        public async Task SendNotifications(List<Domain.Entities.Notification> notifications)
        {
            List<Task> tasks = new();
            try
            {
                foreach (var notification in notifications)
                {
                    string notificationClient = $"notificationSendToUser-{notification.UserId}";
                    var publishTask = Task.Run(() => _notificationHubContext.Clients.All.SendAsync(notificationClient, notification));
                    tasks.Add(publishTask);
                }
                await Task.WhenAll(tasks);
            }
            catch (Exception ex)
            {
                // TODO: Add logs
                Console.WriteLine($"SendNotifications - {ex.Message}");
            }
        }

        public async Task<ResponseDto<Domain.Entities.Notification>> UpdateNotifications(List<Domain.Entities.Notification> notifications)
        {
            ResponseDto<Domain.Entities.Notification> response = new()
            {
                IsSuccessful = true,
                StatusCode = 200,
                Message = "Notificaciones actualizadas exitosamente",
                Data = new List<Domain.Entities.Notification>()
            };

            try
            {
                foreach (var notification in notifications)
                {
                    notification.Readed = true;
                    notification.CreatedDate = DateTime.UtcNow;
                }

                response.Data = await _notificationRepository.UpdateNotifications(notifications);

                if (response.Data is not null && response.Data.Any())
                {
                    return response;
                }

                response.StatusCode = 404;
                response.IsSuccessful = false;
                response.Message = "No se actualizaron las notificaciones";

                return response;
            }
            catch (Exception ex)
            {
                // TODO: Add logs
                Console.WriteLine($"UpdateNotifications - {ex.Message}");
                response.IsSuccessful = false;
                response.StatusCode = 500;
                response.Message = "Error al actualizar las notificaciones";
                return response;
            }
        }

        private static bool IsListValid<T>(IEnumerable<T> data)
        {
            return data is null || !data.Any();
        }
    }
}
