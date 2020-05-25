using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaxiServiceAPI.Data.Models;

namespace TaxiServiceAPI.Data
{
    public interface IAuthRepository
    {
        Task<User> Register(User user, string password);
        Task<User> Login(string username, string password);
        Task<bool> UserExists(string username);
    }
}
