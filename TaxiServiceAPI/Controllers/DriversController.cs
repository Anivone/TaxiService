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
using TaxiServiceAPI.Data.QueryObjects;

namespace TaxiServiceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DriversController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DriversController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("productive")]
        public async Task<ActionResult<IEnumerable<StaffDriver>>> GetProductiveDrivers()
        {
            return await _context.Drivers.FromSqlRaw("SELECT * FROM Drivers AS D WHERE D.DriverId IN (SELECT O1.DriverId FROM Orders AS O1 INNER JOIN Orders AS O2 ON O1.DriverId = O2.DriverId WHERE O1.ClientId IN (SELECT C.ClientId FROM Clients AS C WHERE C.CreditCardNum IS NOT NULL) AND O2.ClientId IN (SELECT C.ClientId FROM Clients AS C WHERE C.CreditCardNum IS NOT NULL) AND O1.ClientId <> O2.ClientId)").ToListAsync();
        }

        [HttpGet("available")]
        public async Task<ActionResult<IEnumerable<DriverCarQueryObject>>> GetAvailableDrivers()
        {
            return await _context.DriverCarQueryObjects.FromSqlRaw("SELECT D.DriverId, D.FirstName, D.LastName, C.TypeOfCar FROM Drivers AS D INNER JOIN Cars AS C ON D.CarId = C.CarId WHERE Available = 'true';").ToListAsync();
        }

        [HttpPost("phone")]
        public async Task<ActionResult<StaffDriver>> GetDriverFromPhone(GetPersonByPhone phone)
        {
            var staffDriver = await _context.Drivers.FromSqlInterpolated(
                $"SELECT * FROM Drivers AS O WHERE EXISTS(SELECT * FROM DriverPhones AS OP WHERE O.DriverId = OP.DriverId AND OP.PhoneNumber = {phone.Phone})").FirstOrDefaultAsync();

            if (staffDriver == null) return NotFound();

            return staffDriver;
        }

        [HttpPut("available/{id}")]
        public async Task<IActionResult> UpdateDriverAvailability(int id, AvailableDriverDto available)
        {
            await _context.Database.ExecuteSqlInterpolatedAsync(
                $"UPDATE Drivers SET Available = {available.Available} WHERE DriverId = {id}");
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DriverExists(id))
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
        #region CRUD
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StaffDriver>>> GetDrivers()
        {
            return await _context.Drivers.FromSqlRaw("SELECT * FROM Drivers").ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<StaffDriver>> GetOperator(int id)
        {
            var staffDriver = await _context.Drivers.FromSqlInterpolated(
                $"SELECT * FROM Drivers WHERE DriverId = {id}").FirstOrDefaultAsync();

            if (staffDriver == null)
            {
                return NotFound();
            }

            return staffDriver;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutDriver(int id, StaffDriver staffDriver)
        {
            if (id != staffDriver.DriverId)
            {
                return BadRequest();
            }

            await _context.Database.ExecuteSqlInterpolatedAsync(
                $"UPDATE Drivers SET DepartmentId = {staffDriver.DepartmentId}, LastName = {staffDriver.LastName}, FirstName = {staffDriver.FirstName}, MiddleName = {staffDriver.MiddleName}, DateOfBirth = {staffDriver.DateOfBirth}, Region = {staffDriver.Region}, City = {staffDriver.City}, Street = {staffDriver.Street}, Building = {staffDriver.Building}, Flat = {staffDriver.Flat}, Beginning = {staffDriver.Beginning}, Ending = {staffDriver.Ending}, Salary = {staffDriver.Salary}, Available = {staffDriver.Available} WHERE DriverId = {id}");

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DriverExists(id))
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
        public async Task<ActionResult<StaffDriver>> PostDriver(StaffDriver staffDriver)
        {
            await _context.Database.ExecuteSqlInterpolatedAsync($"INSERT INTO Drivers (CarId, DepartmentId, LastName, FirstName, MiddleName, DateOfBirth, Region, City, Street, Building, Flat, Beginning, Ending, Salary, Available) VALUES ({staffDriver.CarId}, {staffDriver.DepartmentId}, {staffDriver.LastName}, {staffDriver.FirstName}, {staffDriver.MiddleName}, {staffDriver.DateOfBirth}, {staffDriver.Region}, {staffDriver.City}, {staffDriver.Street}, {staffDriver.Building}, {staffDriver.Flat}, {staffDriver.Beginning}, {staffDriver.Ending}, {staffDriver.Salary}, {staffDriver.Available})");

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOperator", new { id = staffDriver.DriverId }, staffDriver);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<StaffDriver>> DeleteDriver(int id)
        {
            var staffDriver = await _context.Drivers.FindAsync(id);
            if (staffDriver == null)
            {
                return NotFound();
            }

            await _context.Database.ExecuteSqlInterpolatedAsync(
               $"DELETE FROM Drivers WHERE DriverId = {id}");
            await _context.SaveChangesAsync();

            return staffDriver;
        }

        private bool DriverExists(int id)
        {
            return _context.Drivers.Any(e => e.DriverId == id);
        }
        #endregion
    }
}