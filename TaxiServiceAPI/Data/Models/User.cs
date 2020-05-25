using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TaxiServiceAPI.Data.Models
{
    public class User
    {
        public int Id { get; set; }
        
        [Required]
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        [Required]
        public string Role { get; set; }
    }
}
