using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace TaxiServiceAPI.Repositories.HttpRepository
{
    public interface IHttpRepository<T> where T: class
    {
        Task<ActionResult<IEnumerable<T>>> GetAll();
        Task<ActionResult<T>> Get(int id);
        Task<T> Add(T entity);
        Task<T> Update(T entity);
        Task<T> Delete(int id);
    }
}
