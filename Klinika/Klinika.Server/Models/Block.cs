using Klinika.Server.Models.User;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Klinika.Server.Models
{
    public class Block
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }

        [MaxLength(100)]
        public string name { get; set; }

        [Required]
        public int specializationId { get; set; }

        [ForeignKey(nameof(specializationId))]
        [JsonIgnore]
        public virtual Specialization Specialization { get; set; }

        [JsonIgnore]
        public virtual ICollection<ServiceDesk>? ServiceDesks { get; set; }

    }
}
