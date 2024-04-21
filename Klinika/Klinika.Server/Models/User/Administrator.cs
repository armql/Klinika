using Klinika.Server.Models.Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Klinika.Server.Models.User
{
    public class Administrator
    {
        [Key]
        public string id { get; set; }

        [Required]
        public int serviceDeskId { get; set; }

        [ForeignKey(nameof(serviceDeskId))]
        [JsonIgnore]
        public virtual ServiceDesk ServiceDesk { get; set; }

        [ForeignKey(nameof(id))]
        [JsonIgnore]
        public virtual ApplicationUser User { get; set; }
    }
}
