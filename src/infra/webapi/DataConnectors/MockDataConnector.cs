using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using VgInventory.Infra.WebApi.Models;

namespace VgInventory.Infra.WebApi.DataConnectors
{
    public class MockDataConnector<TEntity> : IDataConnector<TEntity>
    {
        private static List<User> UserTable = new[]
        {
            new User() { Id = "fa98cc2a-4477-4e68-a9f9-a9684cacda9b", UserName = "User1", CreationDate = DateTime.Now.AddMonths(-1).ToUniversalTime() },
            new User() { Id = "79a7e16d-1958-4ecc-ac95-fd7e6a0ecb35", UserName = "User2", CreationDate = DateTime.Now.AddMonths(-2).ToUniversalTime() },
            new User() { Id = "34f4957b-a558-4aa8-be2c-0b17f0c2aa00", UserName = "User3", CreationDate = DateTime.Now.AddMonths(-3).ToUniversalTime() },
            new User() { Id = "c6d18c97-6596-453b-826e-538423ae1521", UserName = "User4", CreationDate = DateTime.Now.AddMonths(-4).ToUniversalTime() },
            new User() { Id = "192c2056-5fc5-44a8-8c94-a6b9bcc60b17", UserName = "User5", CreationDate = DateTime.Now.AddMonths(-5).ToUniversalTime() },
        }.ToList();

        private static List<UserCredential> UserCredentialTable = new[]
        {
            new UserCredential() { Id = UserTable[0].Id, Password = "Password1" },
            new UserCredential() { Id = UserTable[1].Id, Password = "Password2" },
            new UserCredential() { Id = UserTable[2].Id, Password = "Password3" },
            new UserCredential() { Id = UserTable[3].Id, Password = "Password4" },
            new UserCredential() { Id = UserTable[4].Id, Password = "Password5" },
        }.ToList();

        public MockDataConnector()
        {
        }

        public Task CreateAsync(TEntity entity)
        {
            if (typeof(TEntity) == typeof(User))
            {
                var item = (User)Convert.ChangeType(entity, typeof(User));
                if (!UserTable.Contains(item))
                {
                    UserTable.Add(item);
                }
            }
            else if (typeof(TEntity) == typeof(UserCredential))
            {
                var item = (UserCredential)Convert.ChangeType(entity, typeof(UserCredential));
                if (!UserCredentialTable.Contains(item))
                {
                    UserCredentialTable.Add(item);
                }   
            }

            return Task.CompletedTask;
        }

        public Task DeleteAsync(TEntity entity)
        {
            if (typeof(TEntity) == typeof(User))
            {
                var item = (User)Convert.ChangeType(entity, typeof(User));
                if (UserTable.Contains(item))
                {
                    UserTable.Remove(item);
                }
            }
            else if (typeof(TEntity) == typeof(UserCredential))
            {
                var item = (UserCredential)Convert.ChangeType(entity, typeof(UserCredential));
                if (UserCredentialTable.Contains(item))
                {
                    UserCredentialTable.Remove(item);
                }  
            }

            return Task.CompletedTask;
        }

        public Task<IEnumerable<TEntity>> ReadAsync()
        {
            if (typeof(TEntity) == typeof(User))
            {
                var entities = (List<TEntity>)Convert.ChangeType(UserTable, typeof(List<TEntity>));
                return Task.FromResult<IEnumerable<TEntity>>(entities);
            }
            else if (typeof(TEntity) == typeof(UserCredential))
            {
                var entities = (List<TEntity>)Convert.ChangeType(UserCredentialTable, typeof(List<TEntity>));
                return Task.FromResult<IEnumerable<TEntity>>(entities);
            }

            return Task.FromResult<IEnumerable<TEntity>>(new List<TEntity>());
        }

        public Task<IEnumerable<TEntity>> ReadAsync(Expression<Func<TEntity, bool>> expression)
        {
            if (typeof(TEntity) == typeof(User))
            {
                var table = (List<TEntity>)Convert.ChangeType(UserTable, typeof(List<TEntity>));
                var func =  expression.Compile();
                var entities = table.Where(func).ToList();
                return Task.FromResult<IEnumerable<TEntity>>(entities);
            }
            else if (typeof(TEntity) == typeof(UserCredential))
            {
                var table = (List<TEntity>)Convert.ChangeType(UserCredentialTable, typeof(List<TEntity>));
                var func =  expression.Compile();
                var entities = table.Where(func).ToList();
                return Task.FromResult<IEnumerable<TEntity>>(entities);
            }

            return Task.FromResult<IEnumerable<TEntity>>(new List<TEntity>());
        }

        public Task UpdateAsync(TEntity entity)
        {
            if (typeof(TEntity) == typeof(User))
            {
                var item = (User)Convert.ChangeType(entity, typeof(User));
                if (UserTable.Contains(item))
                {
                    UserTable.Remove(item);
                    UserTable.Add(item);
                }
            }
            else if (typeof(TEntity) == typeof(UserCredential))
            {
                var item = (UserCredential)Convert.ChangeType(entity, typeof(UserCredential));
                if (UserCredentialTable.Contains(item))
                {
                    UserCredentialTable.Remove(item);
                    UserCredentialTable.Add(item);
                }
            }

            return Task.CompletedTask;
        }
    }
}