using Klinika.Server.Models;
using Klinika.Server.Services;
using Microsoft.AspNetCore.SignalR;

public class ChatHub : Hub
{
    private readonly SharedDatabase _shared;
    
    public ChatHub(SharedDatabase shared) => _shared = shared;
    
    public async Task JoinChat(UserConnection conn)
    {
        await Clients.All
            .SendAsync("RecieveMessage", "admin", $"{conn.userName} has joined the chat");
    }

    public async Task JoinSpecificChatRoom(UserConnection conn)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, conn.chatRoom);
        
        _shared.connections[Context.ConnectionId] = conn;
        
        await Clients.Group(conn.chatRoom)
            .SendAsync("RecieveMessage", "admin", $"{conn.userName} has joined the chat");
    }

    public async Task SendMessage(string msg)
    {
        if(_shared.connections.TryGetValue(Context.ConnectionId, out UserConnection conn))
        {
            await Clients.Group(conn.chatRoom)
                .SendAsync("RecieveSpecificMessage", conn.userName, msg);
        }
    }
}