using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaxiServiceAPI.Data.QueryObjects
{
    public class NumberOfOrdersDepartment
    {
        public int Number { get; set; }
        public int DepartmentId { get; set; }
        public string City { get; set; }
    }
}
