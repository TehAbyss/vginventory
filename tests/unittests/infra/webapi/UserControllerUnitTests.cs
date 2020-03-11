using System;
using System.Linq;
using Microsoft.Extensions.Logging.Abstractions;
using Xunit;
using VgInventory.Infra.WebApi;
using VgInventory.Infra.WebApi.Controllers;
using VgInventory.Infra.WebApi.DataConnectors;
using VgInventory.Infra.WebApi.Models;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authentication;

namespace VgInventory.Infra.WebApi.Tests
{
    public class UserControllerUnitTests
    {
        [Fact]
        public void ConstructorNoThrowExeption()
        {
            var logger = NullLogger<UserController>.Instance;
            var controller = new UserController(logger);
        }

        [Fact]
        public void GetUserReturnsEmptyListWhenIdOrUserNameNotFound()
        {
            var controller = CreateUserController();
            var entities = controller.GetUser("someNonExistingIdOrUserName");
            Assert.True(entities.Count() == 0);
        }

        [Fact]
        public void GetUserReturnsListWithOneEntityWhenIdFound()
        {
            var controller = CreateUserController();
            var allEntities = controller.GetUser();
            Assert.True(allEntities.Count() > 0);

            var idToQuery = allEntities.First().Id;
            var entities = controller.GetUser(idToQuery);
            Assert.True(entities.Count() == 1);
        }

        [Fact]
        public void GetUserReturnsListWithOneEntityWhenUserNameFound()
        {
            var controller = CreateUserController();
            var allEntities = controller.GetUser();
            Assert.True(allEntities.Count() > 0);

            var userNameToQuery = allEntities.First().UserName;
            var entities = controller.GetUser(userNameToQuery);
            Assert.True(entities.Count() == 1);
        }

        [Fact]
        public void GetUserCredentialReturnsEmptyListWhenIdNotFound()
        {
            var controller = CreateUserController();
            var entities = controller.GetUserCredential("someNonExistingUser");
            Assert.True(entities.Count() == 0);
        }

        [Fact]
        public void GetUserCredentialReturnsListWithOneEntityWhenIdFound()
        {
            var controller = CreateUserController();
            var allEntities = controller.GetUser();
            Assert.True(allEntities.Count() > 0);

            var idToQuery = allEntities.First().Id;
            var entities = controller.GetUserCredential(idToQuery);
            Assert.True(entities.Count() == 1);
        }

        private static UserController CreateUserController()
        {
            var services = new ServiceCollection();
            services.AddLogging();
            services.AddSingleton(NullLogger<UserController>.Instance);
            services.AddSingleton<ISystemClock, SystemClock>();
            services.AddTransient<UserController>();

            var provider = services.BuildServiceProvider();
            var controller = provider.GetRequiredService<UserController>();
            return controller;
        }

        private static User CreateUser()
        {
            string guid = Guid.NewGuid().ToString();
            return new User
            {
               Id = guid,  
               UserName = "anyUser" + guid.Substring(0,3),
               CreationDate = DateTime.Now.ToUniversalTime(),
            };
        }

        private static UserCredential CreateUserCredential(string id)
        {
            return new UserCredential
            {
                Id = id,
                Password = "anyPassword"
            };
        }
    }
}
