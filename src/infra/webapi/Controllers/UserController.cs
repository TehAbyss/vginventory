using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using VgInventory.Infra.WebApi.DataConnectors;
using VgInventory.Infra.WebApi.Models;

namespace VgInventory.Infra.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> Logger;

        private readonly IDataConnector<User> Users;

        public UserController(ILogger<UserController> logger)
        {
            Logger = logger;
            Users = new CosmosDbDataConnector<User>();
        }

        #region Create

        [HttpPost]
        public ActionResult CreateUser(User user) {
            if (user != null && user.Email.IsValidEmail() && user.UserName.IsValidUserName())
            {
                var emailLower = user.Email.ToLower();
                var userNameLower = user.UserName.ToLower();
                var entities = Users.ReadAsync((entity) =>
                    entity.Email.ToLower().Equals(emailLower) ||
                    entity.UserName.ToLower().Equals(emailLower));
                var count = entities.Result.Count();

                if (count > 0)
                {
                    return Conflict("Failed to create user because user already exists.");
                }
                else
                {
                    var cancellationTokenSource = new CancellationTokenSource(60000);
                    var cancellationToken = cancellationTokenSource.Token;
                    var id = string.Empty;

                    try
                    {
                        id = Task<string>.Factory.StartNew(
                            () => {
                                // This should be reliable enough for getting unique ids but we should
                                // still check because unique-ness is not guaranteed. 
                                var newId = Guid.NewGuid().ToString();
                                while (Users.ReadAsync((entity) => entity.Id.Equals(id)).Result.Count() > 0) 
                                {
                                    cancellationToken.ThrowIfCancellationRequested();
                                    newId = Guid.NewGuid().ToString();
                                }
                                return newId;
                            }, cancellationTokenSource.Token).Result;
                    }
                    catch
                    {
                        return Conflict("Failed to create user because failure to get unique identifier.");
                    }

                    var startDate = DateTime.Now;
                    var newUser = new User
                        {
                            Id = id,
                            Email = user.Email,
                            UserName = user.UserName,
                            StartDate = startDate,
                            Bio = user.Bio,
                            AvatarUrl = user.AvatarUrl
                        };

                    Users.CreateAsync(newUser);
                    var resourceUrl = Path.Combine(Request.Path.ToString(), Uri.EscapeUriString(newUser.UserName));
                    return Created(resourceUrl, newUser);
                }
            }
           
            return BadRequest("Failed to create new user. The user email or user name is invalid.");
        }

        #endregion Create

        #region Read
        
        [HttpGet]
        public IEnumerable<User> ReadUser()
        {
            var entities = Users.ReadAsync();
            return entities.Result;
        }

        [HttpGet("{userName}")]
        public IEnumerable<User> ReadUser(string userName)
        {
            if (userName.IsValidUserName())
            {
                var userNameLower = userName.ToLower();
                var entities = Users.ReadAsync((entity) => entity.UserName.ToLower().Equals(userNameLower)); 
                return entities.Result;
            }

            return new List<User>();
        }

        #endregion Read

        #region Update

        [HttpPut]
        public ActionResult UpdateUser(User user)
        {
            if (user != null && user.UserName.IsValidUserName())
            {
                var userNameLower = user.UserName.ToLower();
                var entities = Users.ReadAsync((entity) => entity.UserName.ToLower().Equals(userNameLower));
                var count = entities.Result.Count();

                if (count == 0)
                {
                    return BadRequest("Failed to update user because user does not exist.");
                }
                else if (count == 1)
                {
                    var entity = entities.Result.First();
                    var newUser = new User
                    {
                        Id = entity.Id,
                        Bio = user.Bio,
                        AvatarUrl = user.AvatarUrl
                    };
                    Users.UpdateAsync(newUser);
                    return Ok();
                }
                else
                {
                    return Conflict("Failed to update user because multiple users found.");
                }
            }

            return BadRequest("Invalid user name.");
        }

        #endregion Update

        #region Delete

        [HttpDelete]
        public ActionResult DeleteUser(User user)
        {
            if (user != null && user.UserName.IsValidUserName())
            {
                var userNameLower = user.UserName.ToLower();
                var entities = Users.ReadAsync((entity) => entity.UserName.ToLower().Equals(userNameLower));
                var count = entities.Result.Count();

                if (count == 0)
                {
                    return BadRequest("Failed to delete user because user does not exist.");
                }
                else if (count == 1)
                {
                    var entity = entities.Result.First();
                    var result = Users.DeleteAsync(entity);
                    return Ok();
                }
                else
                {
                    return Conflict("Failed to delete user because multiple users found.");
                }
            }

            return BadRequest("Invalid user name.");
        }

        #endregion Delete
    }
}
