using System.ComponentModel.DataAnnotations;

namespace Klinika.Server.Models.DTO.Developer
{
    public class SpecializationDto
    {
        [MaxLength(100)]
        public string name { get; set; }
    }
}
