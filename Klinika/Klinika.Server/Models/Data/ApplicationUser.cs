using Klinika.Server.Models.User;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Klinika.Server.Models.Data
{
    public class ApplicationUser : IdentityUser
    {
        [MaxLength(50)]
        public string firstName { get; set; }

        [MaxLength(50)]
        public string lastName { get; set; }

        [MaxLength(50)]
        public string gender { get; set; }

        [Column(TypeName = "date")]
        public DateTime birthDate { get; set; }

        [MaxLength(255)]
        public string? password { get; set; }

        [JsonIgnore]
        public virtual ICollection<PrimaryCareDoctor>? PrimaryCareDoctors { get; set; }

        [JsonIgnore]
        public virtual ICollection<SpecializedDoctor>? SpecializedDoctors { get; set; }

        [JsonIgnore]
        public virtual ICollection<Patient>? Patients { get; set; }

        [JsonIgnore]
        public virtual ICollection<Administrator>? Administrators { get; set; }
    }
}
