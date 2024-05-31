using System.Collections;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Klinika.Server.Models.User;

namespace Klinika.Server.Models;

public class Reservation
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int id { get; set; }
    
    [MaxLength(1000)]
    public string reasonOfConsultation { get; set; }
    public string date { get; set; }
    
    [Required]
    public int slot { get; set; }
    
    public DateTime creationDate { get; set; }
    
    [Required]
    public string specializedDoctorId { get; set; }
    
    [Required]
    public string patientId { get; set; }
    
    [ForeignKey(nameof(specializedDoctorId))]
    [JsonIgnore]
    public virtual SpecializedDoctor? specializedDoctor { get; set; }
    
    [ForeignKey(nameof(patientId))]
    [JsonIgnore]
    public virtual Patient? patient { get; set; }
    
    public virtual ICollection<Consultation>? Consultations { get; set; }
    
}