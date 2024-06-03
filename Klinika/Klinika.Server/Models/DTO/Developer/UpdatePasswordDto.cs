namespace Klinika.Server.Models.DTO.Developer;

public class UpdatePasswordDto
{
    public string id { get; set; }
    public string currentPassword { get; set; }
    public string newPassword { get; set; }
}