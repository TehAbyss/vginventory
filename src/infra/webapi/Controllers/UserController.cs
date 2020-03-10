using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using VgInventory.Infra.WebApi.DataConnector;
using VgInventory.Infra.WebApi.Models;

namespace VgInventory.Infra.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> Logger;

        private readonly IDataConnector<User> Users;

        private readonly IDataConnector<UserCredential> UserCredentials;

        public UserController(ILogger<UserController> logger)
        {
            Logger = logger;
            Users = new MockDataConnector<User>();
            UserCredentials = new MockDataConnector<UserCredential>();
        }

        [HttpGet]
        public IEnumerable<User> GetUser()
        {
            var entities = Users.ReadAsync();
            return entities.Result;
        }

        [HttpGet("{id}")]
        public IEnumerable<User> GetUser(string id)
        {
            var entities = Users.ReadAsync((entity) => entity.Id.Equals(id) || entity.UserName.Equals(id)); 
            return entities.Result;
        }

        [HttpGet("cred/{id}")]
        public IEnumerable<UserCredential> GetUserCredential(string id)
        {
            var entities = UserCredentials.ReadAsync((entity) => entity.Id.Equals(id)); 
            return entities.Result;
        }
    }
}
