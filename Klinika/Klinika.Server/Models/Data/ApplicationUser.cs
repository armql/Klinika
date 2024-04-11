﻿using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
    }
}