using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace Klinika.Server.Models;

public class Satellite
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    
    [MaxLength(100)]
    public string Name { get; set; }
    
    [Required]
    public Boolean IsDeleted {get; set;}
    
    [Required]
    public int PlanetId { get; set; }
    
    [ForeignKey(nameof(PlanetId))]
    [JsonIgnore]
    public virtual Planet? Planet { get; set; }
}