using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.EntityFrameworkCore;
using TaxiServiceAPI.Controllers.BaseControllers;
using TaxiServiceAPI.Data;
using TaxiServiceAPI.Data.Models;
using TaxiServiceAPI.Repositories.HttpRepository;

namespace TaxiServiceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController : HttpController<Department, DepartmentHttpRepository>
    {
        //private readonly ApplicationDbContext _context;

        //public DepartmentsController(ApplicationDbContext context)
        //{
        //    _context = context;
        //}

        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Department>>> GetDepartments()
        //{
        //    return await _context.Departments.FromSqlRaw("SELECT * FROM Departments").ToListAsync();
        //}

        //[HttpGet]
        //[Route("{id}")]
        //public async Task<ActionResult<IEnumerable<Department>>> GetDepartments(int id)
        //{
        //    return await _context.Departments.FromSqlInterpolated($"SELECT * FROM Departments AS D WHERE D.DepartmentId = {id}").ToListAsync();
        //}

        public DepartmentsController(DepartmentHttpRepository repository) : base(repository)
        {
            
        }
    }
}