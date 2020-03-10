using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace VgInventory.Infra.WebApi.DataConnector
{
    public interface IDataConnector<TEntity>
    {
        Task CreateAsync(TEntity entity);

        Task DeleteAsync(TEntity entity);
        
        Task<IEnumerable<TEntity>> ReadAsync();

        Task<IEnumerable<TEntity>> ReadAsync(Expression<Func<TEntity, bool>> expression);

        Task UpdateAsync(TEntity entity);
    }
}