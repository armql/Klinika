using Klinika.Server.Models.User;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Klinika.Server.Models
{
    public class ServiceDesk
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }

        [StringLength(100)]
        public string name { get; set; }

        [MaxLength(100)]
        public string email { get; set; }

        [MaxLength(100)]
        public string operatingHours { get; set; }

        [Required]
        public int blockId { get; set; }

        [ForeignKey(nameof(blockId))]
        [JsonIgnore]
        public virtual Block? Block { get; set; }

        [JsonIgnore]
        public virtual ICollection<Administrator>? Administrators { get; set; }
    }
}
