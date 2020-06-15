using System.ComponentModel.DataAnnotations;

namespace TaxiServiceAPI.Data.Models
{
    public class Car
    {
        [Required]  
        [StringLength(20)]
        public string CarId { get; set; }

        [Required]
        public string TypeOfCar { get; set; }

        public int NumberOfSeats { get; set; }

        [Required]
        public bool ChildSeat { get; set; }
    }
}