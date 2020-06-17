using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaxiServiceAPI.Data.QueryObjects
{
    public class FlatBusinessDrivers
    {
        public int DriverId { get; set; }
        public string DepartmentCity { get; set; }
        public string CarId { get; set; }
        public string TypeOfCar { get; set; }
        
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string Building { get; set; }
        public int? Flat { get; set; }
    }
}
