using Microsoft.AspNetCore.SignalR;

namespace NotificationService.Services.Notification;

public class NotificationHub : Hub
{
    public async Task SendMessage(string user, string message)
    {
        await Clients.All.SendAsync("notificationSendToUser", user, message);
    }
}