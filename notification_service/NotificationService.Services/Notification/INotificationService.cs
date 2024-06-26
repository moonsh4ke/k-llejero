﻿using NotificationService.Domain.DTOs;

namespace NotificationService.Services.Notification
{
    public interface INotificationService
    {
        Task<ResponseDto<Domain.Entities.Notification>> GetNotifications(PaginationDto paginationDto);
        Task<ResponseDto<Domain.Entities.Notification>> SaveNotifications(List<TrackingDto> trackings);
        Task<ResponseDto<Domain.Entities.Notification>> UpdateNotifications(List<Domain.Entities.Notification> notifications);
        Task SendNotifications(List<Domain.Entities.Notification> notifications);
        Task SaveAndSendNotifications(List<TrackingDto> trackings);
    }
} 
