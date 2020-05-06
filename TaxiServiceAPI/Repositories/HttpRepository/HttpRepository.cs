using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaxiServiceAPI.Data;

namespace TaxiServiceAPI.Repositories.HttpRepository
{
    public abstract class HttpRepository<TEntity, TContext> : IHttpRepository<TEntity>
        where TEntity : class
        where TContext : DbContext
    {
        private readonly TContext _context;

        protected HttpRepository(TContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<IEnumerable<TEntity>>> GetAll()
        {
            return await _context.Set<TEntity>().FromSqlRaw("SELECT * FROM " + typeof(TEntity).Name).ToListAsync();
        }

        public Task<ActionResult<TEntity>> Get(int id)
        {
            throw new NotImplementedException();
        }

        public Task<TEntity> Add(TEntity entity)
        {
            throw new NotImplementedException();
        }

        public Task<TEntity> Update(TEntity entity)
        {
            throw new NotImplementedException();
        }

        public Task<TEntity> Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}