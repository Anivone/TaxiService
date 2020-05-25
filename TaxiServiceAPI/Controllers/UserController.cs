using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaxiServiceAPI.Data;

namespace TaxiServiceAPI.Controllers
{
    [Route("[controller]/{action}")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpGet]
        [Authorize(Policy = Policies.Operator)]
        public IActionResult Operator()
        {
            return Ok("Response from Operator");
        }

        [HttpGet]
        [Authorize(Policy = Policies.Driver)]
        public IActionResult Driver()
        {
            return Ok("Response from Driver");
        }

        [HttpGet]
        [Authorize(Policy = Policies.Client)]
        public IActionResult Client()
        {
            return Ok("Response from Client");
        }
    }
}