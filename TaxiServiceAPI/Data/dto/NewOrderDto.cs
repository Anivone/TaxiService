using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaxiServiceAPI.Data.dto
{
    public class NewOrderDto
    {
        public string WayOfOrder { get; set; }
        public int ClientId { get; set; }
        public string DeparturePoint { get; set; }
        public string ArrivalPoint { get; set; }
        public double NumberOfKm { get; set; }
        public string OrderDate { get; set; }
        public DateTime AppointedTime { get; set; }
        public string TypeOfCar { get; set; }
        public string TypeOfPayment { get; set; }
        public double ApproximatePrice { get; set; }

    }
}
