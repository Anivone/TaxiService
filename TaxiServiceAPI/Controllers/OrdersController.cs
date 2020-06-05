﻿using System;
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
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrdersController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("new")]
        public async Task<ActionResult<IEnumerable<Order>>> GetNewOrders()
        {
            return await _context.Orders.FromSqlRaw("SELECT * FROM Orders WHERE OperatorId IS NULL").ToListAsync();
        }

        #region CRUD

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _context.Orders.FromSqlRaw("SELECT * FROM Orders").ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders.FromSqlInterpolated(
                $"SELECT * FROM Orders WHERE OrderId = {id}").FirstOrDefaultAsync();

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        [HttpGet("driver/received/{id}")]
        public async Task<ActionResult<DriverReceivedOrder>> GetReceivedOrders(int id)
        {
            var order = await _context.DriverReceivedOrders.FromSqlInterpolated(
                $"SELECT O.OrderId, C.PhoneNumber, C.FirstName, C.LastName, C.MiddleName, O.DeparturePoint, O.ArrivalPoint, O.NumberOfKm, O.ApproximatePrice, O.AppointedTime, O.TypeOfPayment FROM Orders AS O INNER JOIN Clients AS C ON O.ClientId = C.ClientId WHERE O.DriverId = {id} AND O.FinalPrice IS NULL").FirstOrDefaultAsync();

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            if (id != order.OrderId)
            {
                return BadRequest();
            }

            await _context.Database.ExecuteSqlInterpolatedAsync(
                $"UPDATE Orders SET WayOfOrder = {order.WayOfOrder}, DeparturePoint = {order.DeparturePoint}, ArrivalPoint = {order.ArrivalPoint}, NumberOfKm = {order.NumberOfKm}, ApproximatePrice = {order.ApproximatePrice}, OrderDate = {order.OrderDate}, AppointedTime = {order.AppointedTime}, TypeOfCar = {order.TypeOfCar}, TimeOfAcceptance = {order.TimeOfAcceptance}, TimeOfCompletion = {order.TimeOfCompletion}, TypeOfPayment = {order.TypeOfPayment}, FinalPrice = {order.FinalPrice} WHERE OrderId = {id}");
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
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

        [HttpPut("sendToDriver/{id}")]
        public async Task<IActionResult> SendToDriver(int id, SendOrderToDriverDto sendOrder)
        {
            await _context.Database.ExecuteSqlInterpolatedAsync(
                $"UPDATE Orders SET OperatorId = {sendOrder.OperatorId}, DriverId = {sendOrder.DriverId} WHERE OrderId = {id}");
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
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
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            await _context.Database.ExecuteSqlInterpolatedAsync(
                $"INSERT INTO Orders (WayOfOrder, OperatorId, DriverId, ClientId, DeparturePoint, ArrivalPoint, NumberOfKm, ApproximatePrice, OrderDate, AppointedTime, TypeOfCar, TimeOfAcceptance, TimeOfCompletion, TypeOfPayment, FinalPrice) VALUES ({order.WayOfOrder}, {order.OperatorId}, {order.DriverId}, {order.ClientId}, {order.DeparturePoint}, {order.ArrivalPoint}, {order.NumberOfKm}, {order.ApproximatePrice}, {order.OrderDate}, {order.AppointedTime}, {order.TypeOfCar}, {order.TimeOfAcceptance}, {order.TimeOfCompletion}, {order.TypeOfPayment}, {order.FinalPrice})");
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrder", new { id = order.OrderId }, order);
        }

        [HttpPost("new")]
        public async Task<ActionResult<Order>> PostNewOrder(NewOrderDto orderDto)
        {
            await _context.Database.ExecuteSqlInterpolatedAsync(
                $"INSERT INTO Orders (WayOfOrder, OperatorId, DriverId, ClientId, DeparturePoint, ArrivalPoint, NumberOfKm, ApproximatePrice, OrderDate, AppointedTime, TypeOfCar, TimeOfAcceptance, TimeOfCompletion, TypeOfPayment, FinalPrice) VALUES ({orderDto.WayOfOrder}, NULL, NULL, {orderDto.ClientId}, {orderDto.DeparturePoint}, {orderDto.ArrivalPoint}, {orderDto.NumberOfKm}, {orderDto.ApproximatePrice}, {orderDto.OrderDate}, {orderDto.AppointedTime}, {orderDto.TypeOfCar}, NULL, NULL, {orderDto.TypeOfPayment}, NULL)");
            await _context.SaveChangesAsync();

            return StatusCode(201);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Order>> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }
            await _context.Database.ExecuteSqlInterpolatedAsync(
               $"DELETE FROM Orders WHERE OrderId = {id}");
            await _context.SaveChangesAsync();

            return order;
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.OrderId == id);
        }
        #endregion
    }
}