using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaxiServiceAPI.Data.QueryObjects
{
    public class CreditCardsDriver
    {
        public int DriverId { get; set; }
        public string CarId { get; set; }
        public string City { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime Beginning { get; set; }

    }
}
