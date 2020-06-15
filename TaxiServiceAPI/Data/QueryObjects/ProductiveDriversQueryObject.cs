using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaxiServiceAPI.Data.QueryObjects
{
    public class ProductiveDriversQueryObject
    {
        public int DriverId { get; set; }
        public string City { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public double Salary { get; set; }

        public DateTime Beginning { get; set; }
    }
}
