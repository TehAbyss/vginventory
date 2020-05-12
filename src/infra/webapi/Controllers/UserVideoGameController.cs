using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using VgInventory.Infra.WebApi.DataConnectors;
using VgInventory.Infra.WebApi.Models;

namespace VgInventory.Infra.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserVideoGameController : ControllerBase
    {
        private readonly ILogger<UserVideoGameController> Logger;

        private readonly IDataConnector<UserVideoGame> DataConnector;

        public UserVideoGameController(IDataConnector<UserVideoGame> dataConnector, ILogger<UserVideoGameController> logger)
        {
            Logger = logger;
            DataConnector = dataConnector;
        }

        #region Create

        [HttpPost]
        public ActionResult CreateUserVideoGame(UserVideoGame model) {
            if (model != null && model.UserId != null && model.VideoGameId != null)
            {
                var entities = DataConnector.ReadAsync((entity) =>
                    entity.UserId.Equals(model.UserId) &&
                    entity.VideoGameId.Equals(model.VideoGameId));
                var count = entities.Result.Count();

                if (count > 0)
                {
                    return Conflict("Failed to create user video game because it already exists.");
                }
                else
                {
                    var userVideoGame = new UserVideoGame
                        {
                            Id = model.UserId + model.VideoGameId,
                            UserId = model.UserId,
                            VideoGameId = model.VideoGameId,
                            IsCompleted = model.IsCompleted,
                            IsWishListed = model.IsWishListed,
                            IsOwned = model.IsOwned
                        };

                    DataConnector.CreateAsync(userVideoGame);
                    var resourceUrl = Path.Combine(Request.Path.ToString(), userVideoGame.GetId());
                    return Created(resourceUrl, userVideoGame);
                }
            }
           
            return BadRequest("Failed to create new user video game.");
        }

        #endregion Create

        #region Read

        [HttpGet]
        public IEnumerable<UserVideoGame> ReadUserVideoGame(string userId, string videoGameId, int all = 0)
        {
            if (all == 1) 
            {
                var entities = DataConnector.ReadAsync();
                return entities.Result;
            }
            else
            {
                if (userId != null && videoGameId != null)
                {
                    var entities = DataConnector.ReadAsync((entity) =>
                        entity.UserId.Equals(userId) &&
                        entity.VideoGameId.Equals(videoGameId)
                    );
                    return entities.Result;
                }
                else if (userId != null)
                {
                    var entities = DataConnector.ReadAsync((entity) =>
                        entity.UserId.Equals(userId)
                    );
                    return entities.Result;
                }
                else if (videoGameId != null) 
                {
                    var entities = DataConnector.ReadAsync((entity) =>
                        entity.VideoGameId.Equals(videoGameId)
                    );
                    return entities.Result;
                }
                else 
                {
                    return new List<UserVideoGame>();
                }
            }
        }

        #endregion Read

        #region Update

        [HttpPut]
        public ActionResult UpdateUserVideoGame(UserVideoGame model)
        {
            if (model != null && model.UserId != null && model.VideoGameId != null)
            {
                var entities = DataConnector.ReadAsync((entity) =>
                    entity.UserId.Equals(model.UserId) &&
                    entity.VideoGameId.Equals(model.VideoGameId)
                );
                var count = entities.Result.Count();

                if (count == 0)
                {
                    return BadRequest("Failed to update user video game because it does not exist.");
                }
                else if (count == 1)
                {
                    var entity = entities.Result.First();
                    entity.IsCompleted = model.IsCompleted;
                    entity.IsOwned = model.IsOwned;
                    entity.IsWishListed = model.IsWishListed;

                    DataConnector.UpdateAsync(entity);
                    return Ok();
                }
                else
                {
                    return Conflict("Failed to update user video game because multiple entities found.");
                }
            }

            return BadRequest("Invalid user video game.");
        }

        #endregion Update

        #region Delete

        [HttpDelete]
        public ActionResult DeleteUser(UserVideoGame model)
        {
            if (model != null && model.UserId != null && model.VideoGameId != null)
            {
                var entities = DataConnector.ReadAsync((entity) =>
                    entity.UserId.Equals(model.UserId) &&
                    entity.VideoGameId.Equals(model.VideoGameId));
                var count = entities.Result.Count();

                if (count == 0)
                {
                    return BadRequest("Failed to delete user video game because user does not exist.");
                }
                else if (count == 1)
                {
                    var entity = entities.Result.First();
                    var result = DataConnector.DeleteAsync(entity);
                    return Ok();
                }
                else
                {
                    return Conflict("Failed to delete user video game because multiple entities found.");
                }
            }

            return BadRequest("Invalid user video game.");
        }

        #endregion Delete
    }
}
