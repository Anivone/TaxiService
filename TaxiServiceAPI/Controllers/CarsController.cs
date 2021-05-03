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
    public class CarsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CarsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Car>>> GetCars()
        {
            return await _context.Cars.FromSqlRaw("SELECT * FROM \"Cars\"").ToListAsync();
            // return await _context.Cars.ToListAsync();
        }

        [HttpGet("available")]
        public async Task<ActionResult<IEnumerable<AvailableCar>>> GetAvailableCars()
        {
            return await _context.AvailableCars.FromSqlRaw("SELECT C.\"CarId\", C.\"TypeOfCar\" FROM \"Cars\" AS C LEFT JOIN \"Drivers\" AS D ON C.\"CarId\" = D.\"CarId\" GROUP BY C.\"CarId\", C.\"TypeOfCar\" HAVING COUNT(*) < 2").ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Car>> GetCar(string id)
        {
            var car = await _context.Cars.FromSqlInterpolated(
                $"SELECT * FROM \"Cars\" WHERE \"CarId\" = {id}").FirstOrDefaultAsync();

            if (car == null)
            {
                return NotFound();
            }

            return car;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCar(string id, Car car)
        {
            if (id != car.CarId)
            {
                return BadRequest();
            }
            
            await _context.Database.ExecuteSqlInterpolatedAsync(
                $"UPDATE \"Cars\" SET \"TypeOfCar\" = {car.TypeOfCar}, \"NumberOfSeats\" = {car.NumberOfSeats}, \"ChildSeat\" = {car.ChildSeat} WHERE \"CarId\" = {id}");

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CarExists(id))
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
        public async Task<ActionResult<Car>> PostCar(Car car)
        {
            await _context.Database.ExecuteSqlInterpolatedAsync(
                $"INSERT INTO \"Cars\" (\"CarId\", \"TypeOfCar\", \"NumberOfSeats\", \"ChildSeat\") VALUES ({car.CarId}, {car.TypeOfCar}, {car.NumberOfSeats}, {car.ChildSeat})");
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCar", new { id = car.CarId }, car);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Car>> DeleteCar(string id)
        {
            var car = await _context.Cars.FindAsync(id);
            if (car == null)
            {
                return NotFound();
            }
            await _context.Database.ExecuteSqlInterpolatedAsync(
               $"DELETE FROM \"Cars\" WHERE \"CarId\" = {id}");
            await _context.SaveChangesAsync();

            return car;
        }

        private bool CarExists(string id)
        {
            return _context.Cars.Any(e => e.CarId == id);
        }
    }
}