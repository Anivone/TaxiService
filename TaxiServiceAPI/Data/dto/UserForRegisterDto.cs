using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TaxiServiceAPI.Data.dto
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(16, MinimumLength = 8, ErrorMessage = "You must specify password of between 8 and 16 characters")]
        public string Password { get; set; }

        [Required]
        public string Role { get; set; }
    }
}
