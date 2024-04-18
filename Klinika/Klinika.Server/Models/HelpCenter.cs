using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.Metrics;

namespace Klinika.Server.Models
{
    public class HelpCenter
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id {  get; set; }

        [MaxLength(100)]
        public string name { get; set; }

        [MaxLength(100)]
        public string email { get; set; }

        [MaxLength(255)]
        public string subject { get; set; }

        [MaxLength(5000)]
        public string message { get; set; }

        public DateTime creationDate { get; set; }

        [Required]
        public int categoryId { get; set; }


        [ForeignKey(nameof(categoryId))]
        public virtual HelpCenterCategory HelpCenterCategory { get; set; }
    }
}
