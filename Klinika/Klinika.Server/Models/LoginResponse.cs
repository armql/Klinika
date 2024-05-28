namespace Klinika.Server.Models;

public class LoginResponse
{
    public string jwtToken { get; set; }
    
    public string refreshToken { get; set; }
    
    public bool isLoggedIn { get; set; }
}