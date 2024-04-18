using System.ComponentModel.DataAnnotations;

namespace Klinika.Server.Models.DTO
{
    public class IdentityDtoCase
    {
        public Guid id { get; set; }

        [MaxLength(100)]
        public string Name { get; set; }
    }
}
