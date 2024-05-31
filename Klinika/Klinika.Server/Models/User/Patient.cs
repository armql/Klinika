using System.Collections;
using Klinika.Server.Models.Data;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Klinika.Server.Models.User
{
    public class Patient
    {
        [Key]
        public string id { get; set; }

        [ForeignKey(nameof(id))]
        [JsonIgnore]
        public virtual ApplicationUser User { get; set; }

        public virtual ICollection<Reservation>? Reservations { get; set; }
    }
}
