using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaxiServiceAPI.Data;
using TaxiServiceAPI.Data.dto;
using TaxiServiceAPI.Data.Models;

namespace TaxiServiceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OperatorsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OperatorsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<StaffOperator>>> GetOperators()
        {
            return await _context.Operators.FromSqlRaw("SELECT * FROM Operators").ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<StaffOperator>> GetOperator(int id)
        {
            var staffOperator = await _context.Operators.FromSqlInterpolated(
                $"SELECT * FROM Operators WHERE OperatorId = {id}").FirstOrDefaultAsync();

            if (staffOperator == null)
            {
                return NotFound();
            }

            return staffOperator;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutOperator(int id, StaffOperator staffOperator)
        {
            if (id != staffOperator.OperatorId)
            {
                return BadRequest();
            }

            await _context.Database.ExecuteSqlInterpolatedAsync(
                $"UPDATE Operators SET DepartmentId = {staffOperator.DepartmentId}, LastName = {staffOperator.LastName}, FirstName = {staffOperator.FirstName}, MiddleName = {staffOperator.MiddleName}, DateOfBirth = {staffOperator.DateOfBirth}, Region = {staffOperator.Region}, City = {staffOperator.City}, Street = {staffOperator.Street}, Building = {staffOperator.Building}, Flat = {staffOperator.Flat}, Beginning = {staffOperator.Beginning}, Ending = {staffOperator.Ending}, Salary = {staffOperator.Salary}, WorkingPhone = {staffOperator.WorkingPhone} WHERE OperatorId = {id}");

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OperatorExists(id))
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
        public async Task<ActionResult<StaffOperator>> PostOperator(StaffOperator staffOperator)
        {
            await _context.Database.ExecuteSqlInterpolatedAsync($"INSERT INTO Operators (DepartmentId, LastName, FirstName, MiddleName, DateOfBirth, Region, City, Street, Building, Flat, Beginning, Ending, Salary, WorkingPhone) VALUES ({staffOperator.DepartmentId}, {staffOperator.LastName}, {staffOperator.FirstName}, {staffOperator.MiddleName}, {staffOperator.DateOfBirth}, {staffOperator.Region}, {staffOperator.City}, {staffOperator.Street}, {staffOperator.Building}, {staffOperator.Flat}, {staffOperator.Beginning}, {staffOperator.Ending}, {staffOperator.Salary}, {staffOperator.WorkingPhone})");

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOperator", new { id = staffOperator.OperatorId }, staffOperator);
        }

        [HttpPost("phone")]
        public async Task<ActionResult<StaffOperator>> GetOperatorFromPhone(GetPersonByPhone phone)
        {
            var staffOperator = await _context.Operators.FromSqlInterpolated(
            $"SELECT * FROM Operators AS O WHERE EXISTS(SELECT * FROM OperatorPhones AS OP WHERE O.OperatorId = OP.OperatorId AND OP.PhoneNumber = {phone.Phone})").FirstOrDefaultAsync();

            if (staffOperator == null) return NotFound();

            return staffOperator;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<StaffOperator>> DeleteOperator(int id)
        {
            var staffOperator = await _context.Operators.FindAsync(id);
            if (staffOperator == null)
            {
                return NotFound();
            }

            await _context.Database.ExecuteSqlInterpolatedAsync(
               $"DELETE FROM Operators WHERE OperatorId = {id}");
            await _context.SaveChangesAsync();

            return staffOperator;
        }

        private bool OperatorExists(int id)
        {
            return _context.Operators.Any(e => e.OperatorId == id);
        }
    }
}