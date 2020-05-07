using System.ComponentModel.DataAnnotations;

namespace TaxiServiceAPI.Data.Models
{
    public class DriverPhones
    {
        [Required]
        [StringLength(15)]
        public string PhoneNumber { get; set; }
        public int DriverId { get; set; }
    }
}