using System.ComponentModel.DataAnnotations;

namespace Klinika.Server.Models.DTO.Developer
{
    public class HelpCenterCategoryDto
    {
        [MaxLength(100)]
        public string name { get; set; }
    }
}
