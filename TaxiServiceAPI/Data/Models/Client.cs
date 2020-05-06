using System;
using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;

namespace TaxiServiceAPI.Data.Models
{
    public class Client
    {
        public int ClientId { get; set; }

        [Required]
        [StringLength(15)]
        public string PhoneNumber { get; set; }

        [Required]
        [StringLength(20)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(20)]
        public string LastName { get; set; }

        [StringLength(20)]
        public string MiddleName { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime DateOfRegistration { get; set; }

        [StringLength(30)]
        public string Email { get; set; }

        [MaxLength(19)]
        public string CreditCardNum { get; set; }
    }
}