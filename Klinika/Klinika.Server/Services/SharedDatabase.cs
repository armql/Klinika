using System.Collections.Concurrent;
using Klinika.Server.Models;

namespace Klinika.Server.Services;

public class SharedDatabase
{
    private readonly ConcurrentDictionary<string, UserConnection> _connections = new ();
    
    public ConcurrentDictionary<string, UserConnection> connections => _connections;
}