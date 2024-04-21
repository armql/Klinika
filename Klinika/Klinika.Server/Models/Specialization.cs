using Klinika.Server.Models.User;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Klinika.Server.Models
{
    public class Specialization
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }

        [MaxLength(100)]
        public string name { get; set; }

        public string createdBy { get; set; }

        public DateTime creationDate { get; set; }

        public virtual ICollection<PrimaryCareDoctor>? PrimaryCareDoctors { get; set; }

        public virtual ICollection<SpecializedDoctor>? SpecializedDoctors { get; set; }

        public virtual ICollection<Block>? Blocks { get; set; }
    }
}
