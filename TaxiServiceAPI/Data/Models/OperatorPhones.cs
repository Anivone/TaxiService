using System.ComponentModel.DataAnnotations;

namespace TaxiServiceAPI.Data.Models
{
    public class OperatorPhones
    {
        [Required]
        [StringLength(15)]
        public string PhoneNumber { get; set; }
        public int OperatorId { get; set; }
    }
}