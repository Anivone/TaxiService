using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaxiServiceAPI.Data.dto
{
    public class SendOrderToDriverDto 
    {
        public int OperatorId { get; set; }
        public int DriverId { get; set; }
    }
}
