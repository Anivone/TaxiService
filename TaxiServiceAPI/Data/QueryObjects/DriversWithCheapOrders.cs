using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaxiServiceAPI.Data.QueryObjects
{
    public class DriversWithCheapOrders
    {
        public int Number { get; set; }
        public int DriverId { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
    }
}
