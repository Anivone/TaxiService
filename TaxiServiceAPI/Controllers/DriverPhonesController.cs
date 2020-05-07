using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaxiServiceAPI.Data;
using TaxiServiceAPI.Data.Models;

namespace TaxiServiceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DriverPhonesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DriverPhonesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DriverPhones>>> GetDriverPhones()
        {
            return await _context.DriverPhones.FromSqlRaw("SELECT * FROM DriverPhones").ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DriverPhones>> GetDriverPhones(string id)
        {
            var driverPhone = await _context.DriverPhones.FromSqlInterpolated(
                $"SELECT * FROM DriverPhones WHERE PhoneNumber = {id}").FirstOrDefaultAsync();

            if (driverPhone == null)
            {
                return NotFound();
            }

            return driverPhone;
        }

        [HttpPost]
        public async Task<ActionResult<DriverPhones>> PostDriverPhones(DriverPhones driverPhone)
        {
            await _context.Database.ExecuteSqlInterpolatedAsync(
                $"INSERT INTO DriverPhones (PhoneNumber, DriverId) VALUES ({driverPhone.PhoneNumber}, {driverPhone.DriverId})");
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDriverPhones", new { id = driverPhone.PhoneNumber }, driverPhone);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<DriverPhones>> DeleteDriverPhones(string id)
        {
            var driverPhone = await _context.DriverPhones.FindAsync(id);
            if (driverPhone == null)
            {
                return NotFound();
            }
            await _context.Database.ExecuteSqlInterpolatedAsync(
               $"DELETE FROM DriverPhones WHERE PhoneNumber = {id}");
            await _context.SaveChangesAsync();

            return driverPhone;
        }

        private bool DriverPhonesExists(string id)
        {
            return _context.DriverPhones.Any(e => e.PhoneNumber == id);
        }
    }
}