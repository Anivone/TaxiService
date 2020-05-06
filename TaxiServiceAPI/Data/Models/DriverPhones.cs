using System.ComponentModel.DataAnnotations;

namespace TaxiServiceAPI.Data.Models
{
    public class DriverPhones
    {
        [Required]
        public string PhoneNumber { get; set; }
        public int DriverId { get; set; }
    }
}