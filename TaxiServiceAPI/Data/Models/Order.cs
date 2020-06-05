using System;
using System.ComponentModel.DataAnnotations;

namespace TaxiServiceAPI.Data.Models
{
    public class Order
    {
        public int OrderId { get; set; }
        
        [Required]
        [StringLength(15)]
        public string WayOfOrder { get; set; }
        public int? OperatorId { get; set; }
        public int? DriverId { get; set; }

        public int ClientId { get; set; }

        [Required]
        public string DeparturePoint { get; set; }

        [Required]
        public string ArrivalPoint { get; set; }
        public double NumberOfKm { get; set; }

        public double ApproximatePrice { get; set; }

        [DataType(DataType.Date)]
        public DateTime OrderDate { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime? AppointedTime { get; set; }

        [StringLength(15)]
        public string TypeOfCar { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime? TimeOfAcceptance { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime? TimeOfCompletion { get; set; }

        [Required]
        [StringLength(20)]
        public string TypeOfPayment { get; set; }

        public double? FinalPrice { get; set; }
    }
}