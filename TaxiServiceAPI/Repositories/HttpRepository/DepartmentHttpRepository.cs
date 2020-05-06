using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaxiServiceAPI.Data;
using TaxiServiceAPI.Data.Models;

namespace TaxiServiceAPI.Repositories.HttpRepository
{
    public class DepartmentHttpRepository : HttpRepository<Department, ApplicationDbContext>
    {
        public DepartmentHttpRepository(ApplicationDbContext context) : base(context) { }
    }
}
