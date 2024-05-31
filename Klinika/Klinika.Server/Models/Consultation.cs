using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Klinika.Server.Models;

public class Consultation
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int id { get; set; }
    
    [MaxLength(5000)]
    public string notes { get; set; }
    
    [MaxLength(5000)]
    public string evaluation { get; set; }
    
    public DateTime creationDate { get; set; }
    
    [Required]
    public int reservationId { get; set; }
    
    [ForeignKey(nameof(reservationId))]
    [JsonIgnore]
    public virtual Reservation? reservation { get; set; }
}