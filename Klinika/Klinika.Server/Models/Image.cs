using System.ComponentModel.DataAnnotations;

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
}