namespace Klinika.Server.Models;

public class RefreshTokenModel
{
    public string jwtToken { get; set; }
    
    public string refreshToken { get; set; }
}