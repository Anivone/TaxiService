﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaxiServiceAPI.Data.QueryObjects
{
    
    public class DriverCarQueryObject
    {
        public int DriverId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string TypeOfCar { get; set; }
        public bool ChildSeat { get; set; }
        public DateTime Beginning { get; set; }
    }
}
