using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaxiServiceAPI.Data;
using TaxiServiceAPI.Data.Models;
using TaxiServiceAPI.Data.QueryObjects;

namespace TaxiServiceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DepartmentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("number")]
        public async Task<ActionResult<IEnumerable<NumberOfOrdersDepartment>>> CountDepartments()
        {
            return await _context.NumberOfOrdersDepartments.FromSqlRaw("SELECT COUNT(*) AS Number, D.DepartmentId, D.City FROM (Departments AS D INNER JOIN Operators AS OP ON D.DepartmentId = OP.DepartmentId) INNER JOIN Orders AS O ON OP.OperatorId = O.OperatorId WHERE DATEPART(MONTH, O.OrderDate) = DATEPART(MONTH, GETDATE()) GROUP BY D.DepartmentId, D.City").ToListAsync();
        }

        [HttpGet("productive")]
        public async Task<ActionResult<IEnumerable<Department>>> GetDepartmentsWithProductiveOperators()
        {
            return await _context.Departments.FromSqlRaw("SELECT * FROM Departments AS D WHERE D.DepartmentId IN (SELECT O.DepartmentId FROM Operators AS O WHERE O.OperatorId IN (SELECT Ord.OperatorId FROM Orders AS Ord WHERE DATEPART(MONTH, Ord.OrderDate) = DATEPART(MONTH, GETDATE()) GROUP BY Ord.OperatorId HAVING COUNT(*) >= 5) GROUP BY O.DepartmentId HAVING COUNT(*) >= 2)").ToListAsync();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Department>>> GetDepartments()
        {
            return await _context.Departments.FromSqlRaw("SELECT * FROM Departments").ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Department>> GetDepartment(int id)
        {
            var department = await _context.Departments.FromSqlInterpolated(
                $"SELECT * FROM Departments WHERE DepartmentId = {id}").FirstOrDefaultAsync();

            if (department == null)
            {
                return NotFound();
            }

            return department;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutDepartment(int id, Department department)
        {
            if (id != department.DepartmentId)
            {
                return BadRequest();
            }

            await _context.Database.ExecuteSqlInterpolatedAsync(
                $"UPDATE Departments SET City = {department.City} WHERE DepartmentId = {id}");

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DepartmentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Department>> PostDepartment(Department department)
        {
            await _context.Database.ExecuteSqlInterpolatedAsync(
                $"INSERT INTO Departments (City) VALUES ({department.City})");
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDepartment", new { id = department.DepartmentId }, department);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Department>> DeleteDepartment(int id)
        {
            var department = await _context.Departments.FindAsync(id);
            if (department == null)
            {
                return NotFound();
            }
            await _context.Database.ExecuteSqlInterpolatedAsync(
               $"DELETE FROM Departments WHERE DepartmentId = {id}");
            await _context.SaveChangesAsync();

            return department;
        }

        private bool DepartmentExists(int id)
        {
            return _context.Departments.Any(e => e.DepartmentId == id);
        }
    }
}
