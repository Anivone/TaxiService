using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaxiServiceAPI.Data.QueryObjects
{
    public class OperatorPhoneQueryObject
    {
        public string PhoneNumber { get; set; }
        public int OperatorId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
    }
}
