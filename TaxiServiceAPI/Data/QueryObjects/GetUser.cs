using Microsoft.AspNetCore.Mvc.RazorPages.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaxiServiceAPI.Data.QueryObjects
{
    public class GetUser
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Role { get; set; }
    }
}
