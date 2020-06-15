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
    public class OperatorPhonesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OperatorPhonesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OperatorPhoneQueryObject>>> GetOperatorPhones()
        {
            return await _context.OperatorQueryPhones.FromSqlRaw("SELECT OP.PhoneNumber, OP.OperatorId, O.FirstName, O.LastName, O.DateOfBirth FROM OperatorPhones AS OP INNER JOIN Operators AS O ON OP.OperatorId = O.OperatorId").ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OperatorPhones>> GetOperatorPhones(string id)
        {
            var operatorPhone = await _context.OperatorPhones.FromSqlInterpolated(
                $"SELECT * FROM OperatorPhones WHERE PhoneNumber = {id}").FirstOrDefaultAsync();

            if (operatorPhone == null)
            {
                return NotFound();
            }

            return operatorPhone;
        }

        [HttpPost]
        public async Task<ActionResult<OperatorPhones>> PostOperatorPhones(OperatorPhones operatorPhone)
        {
            await _context.Database.ExecuteSqlInterpolatedAsync(
                $"INSERT INTO OperatorPhones (PhoneNumber, OperatorId) VALUES ({operatorPhone.PhoneNumber}, {operatorPhone.OperatorId})");
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOperatorPhones", new { id = operatorPhone.PhoneNumber }, operatorPhone);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<OperatorPhones>> DeleteOperatorPhones(string id)
        {
            var operatorPhone = await _context.OperatorPhones.FindAsync(id);
            if (operatorPhone == null)
            {
                return NotFound();
            }
            await _context.Database.ExecuteSqlInterpolatedAsync(
               $"DELETE FROM OperatorPhones WHERE PhoneNumber = {id}");
            await _context.SaveChangesAsync();

            return operatorPhone;
        }

        private bool OperatorPhonesExists(string id)
        {
            return _context.OperatorPhones.Any(e => e.PhoneNumber == id);
        }
    }
}