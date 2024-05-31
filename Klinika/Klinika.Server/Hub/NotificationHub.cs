using Microsoft.AspNetCore.SignalR;

namespace Klinika.Server.Hub;

public class NotificationHub : Microsoft.AspNetCore.SignalR.Hub
{
    public async Task SendWelcomeNotification(string userId, string message)
    {
        await Clients.User(userId).SendAsync("ReceiveWelcomeNotification", message);
    }
}