using Microsoft.Build.Framework;

namespace Klinika.Server.Models;

public class RefreshTokenModel
{
    [Required]
    public string jwtToken { get; set; }
    
    [Required]
    public string refreshToken { get; set; }
}