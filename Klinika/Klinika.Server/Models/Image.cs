using System.ComponentModel.DataAnnotations;
using Klinika.Server.Models.Data;
using Newtonsoft.Json;

namespace Klinika.Server.Models;

public class Image
{
    [Key]
    public int id { get; set; }

    [Required]
    public string fileName { get; set; }

    [Required]
    public string filePath { get; set; }

    [Required]
    public string fileUrl { get; set; }
    
    public string createdBy { get; set; }
    
    public DateTime creationDate { get; set; }
    
    [JsonIgnore]
    public virtual ICollection<ApplicationUser>? ApplicationUsers { get; set; }
}