using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.Azure.Cosmos;
using VgInventory.Infra.WebApi.Models;

namespace VgInventory.Infra.WebApi.DataConnectors
{
    public class CosmosDbDataConnector<TEntity> : IDataConnector<TEntity>
    {
        private static readonly string endpointUrl = Environment.GetEnvironmentVariable("AZURE_COSMOS_ENDPOINT");
        private static readonly string authKey = Environment.GetEnvironmentVariable("AZURE_COSMOS_MASTER_KEY");
        private static readonly string databaseId = Environment.GetEnvironmentVariable("AZURE_COSMOS_DATABASE_ID");

        private Container container;

        public CosmosDbDataConnector() {
            this.container = GetContainerAsync().Result;
        }

        public async Task<Container> GetContainerAsync()
        {
            var cosmosClientOptions = new CosmosClientOptions
            {
                SerializerOptions = new CosmosSerializationOptions
                {
                    PropertyNamingPolicy = CosmosPropertyNamingPolicy.CamelCase,
                },
            };
            var client = new CosmosClient(endpointUrl, authKey, cosmosClientOptions);
            var response = await client.CreateDatabaseIfNotExistsAsync(databaseId);
            var entity = Activator.CreateInstance(typeof(TEntity));
            var model = (ICosmosDbModel)(entity);
            var container = await response.Database.CreateContainerIfNotExistsAsync(
                model.GetContainerId(),
                model.GetPartitionKeyPath());
            return container;
        }

        public async Task CreateAsync(TEntity entity)
        {
            await this.container.CreateItemAsync(entity);
        }

        public async Task DeleteAsync(TEntity entity)
        {
            var item = (ICosmosDbModel)Convert.ChangeType(entity, typeof(ICosmosDbModel));
            await this.container.DeleteItemAsync<TEntity>(item.GetId(), item.GetId().GetPartitionKey());
        }

        public Task<IEnumerable<TEntity>> ReadAsync()
        {
            var queryable = this.container.GetItemLinqQueryable<TEntity>(true, null, null);
            var entities = queryable.ToList();
            return Task.FromResult<IEnumerable<TEntity>>(entities);
        }

        public Task<IEnumerable<TEntity>> ReadAsync(Expression<Func<TEntity, bool>> expression)
        {
            var queryable = this.container.GetItemLinqQueryable<TEntity>(true, null, null);
            var entities = queryable.Where(expression).ToList();
            return Task.FromResult<IEnumerable<TEntity>>(entities);
        }

        public async Task UpdateAsync(TEntity entity)
        {
            var item = (ICosmosDbModel)Convert.ChangeType(entity, typeof(ICosmosDbModel));
            await this.container.UpsertItemAsync(entity, item.GetId().GetPartitionKey());
        }
    }

    public static class CosmosDbExtensions
    {
        public static PartitionKey GetPartitionKey(this string value)
        {
            return new PartitionKey(value.ToLowerInvariant());
        }
    }
}
