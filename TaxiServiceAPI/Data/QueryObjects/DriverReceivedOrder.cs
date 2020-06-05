using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TaxiServiceAPI.Data.QueryObjects
{
    public class DriverReceivedOrder
    {
        public int OrderId { get; set; }
        public string PhoneNumber { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string MiddleName { get; set; }

        public string DeparturePoint { get; set; }

        public string ArrivalPoint { get; set; }

        public double NumberOfKm { get; set; }

        public double ApproximatePrice { get; set; }

        public DateTime AppointedTime { get; set; }

        public string TypeOfPayment { get; set; }

    }
}
