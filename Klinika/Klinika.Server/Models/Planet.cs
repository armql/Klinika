using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Klinika.Server.Models;

public class Planet
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    
    [MaxLength(100)]
    public string Name { get; set; }
    
    [Required]
    public string Type { get; set; }
    
    [Required]
    public Boolean IsDeleted {get; set;}
}