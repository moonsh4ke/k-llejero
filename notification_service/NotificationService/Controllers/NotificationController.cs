using Microsoft.AspNetCore.Mvc;
using NotificationService.Domain.DTOs;
using NotificationService.Services.Notification;

namespace NotificationService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationService notificationService;

        public NotificationController(INotificationService notificationService)
        {
            this.notificationService = notificationService;
        }

        [HttpGet]
        public async Task<ResponseDto<Domain.Entities.Notification>> Get([FromQuery] PaginationDto paginationDto)
        {
            return await notificationService.GetNotifications(paginationDto);
        }
    }
}
