using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaxiServiceAPI.Repositories.HttpRepository;

namespace TaxiServiceAPI.Controllers.BaseControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public abstract class HttpController<TEntity, TRepository> : ControllerBase
        where TEntity : class
        where TRepository : IHttpRepository<TEntity>
    {
        private readonly TRepository _repository;

        protected HttpController(TRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TEntity>>> Get()
        {
            return await _repository.GetAll();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TEntity>> Get(int id)
        {
            var entity = await _repository.Get(id);

            return entity ?? NotFound();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, TEntity value)
        {
            await _repository.Update(value);
            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<TEntity>> Post(TEntity movie)
        {
            await _repository.Add(movie);
            return NoContent();
        }

        // DELETE: api/[controller]/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TEntity>> Delete(int id)
        {
            var movie = await _repository.Delete(id);
            if (movie == null)
            {
                return NotFound();
            }
            return movie;
        }
    }
}