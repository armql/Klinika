using System.ComponentModel.DataAnnotations;

namespace Klinika.Server.Models.DTO.Developer
{
    public class IdentityDto
    {

        [MaxLength(100)]
        public string Name { get; set; }
    }
}
