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
    public class VideoGamesController : ControllerBase
    {
        private readonly ILogger<VideoGamesController> Logger;

        private readonly IDataConnector<VideoGame> DataConnector;

        public VideoGamesController(IDataConnector<VideoGame> dataConnector, ILogger<VideoGamesController> logger)
        {
            Logger = logger;
            DataConnector = dataConnector;
        }

        #region Create

        [HttpPost]
        public ActionResult CreateVideoGame(VideoGame videoGame) {
            if (videoGame != null)
            {
                var title = videoGame.Title.ToLower();
                var entities = DataConnector.ReadAsync((entity) =>
                    entity.Title.ToLower().Equals(title));
                var count = entities.Result.Count();

                if (count > 0)
                {
                    return Conflict($"Failed to create video game because {title} already exists.");
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
                                while (DataConnector.ReadAsync((entity) => entity.Id.Equals(id)).Result.Count() > 0) 
                                {
                                    cancellationToken.ThrowIfCancellationRequested();
                                    newId = Guid.NewGuid().ToString();
                                }
                                return newId;
                            }, cancellationTokenSource.Token).Result;
                    }
                    catch
                    {
                        return Conflict("Failed to create video game because failure to get unique identifier.");
                    }

                    videoGame.Id = id;
                    DataConnector.CreateAsync(videoGame);
                    var resourceUrl = Path.Combine(Request.Path.ToString(), Uri.EscapeUriString(videoGame.Title));
                    return Created(resourceUrl, videoGame);
                }
            }
           
            return BadRequest("Failed to create new video game.");
        }

        #endregion Create

        #region Read
        
        [HttpGet]
        public IEnumerable<VideoGame> ReadVideoGame()
        {
            var entities = DataConnector.ReadAsync();
            return entities.Result;
        }

        [HttpGet("{title}")]
        public ActionResult ReadVideoGame(string title)
        {
            if (!string.IsNullOrEmpty(title))
            {
                var titleToLower = title.ToLower();
                var entities = DataConnector.ReadAsync((entity) => entity.Title.ToLower().Equals(titleToLower)); 
                return Ok(entities.Result.First());
            }

            return BadRequest($"Failed to get video game because {title} does not exist.");
        }

        #endregion Read

        #region Update

        [HttpPut("{title}")]
        public ActionResult UpdateUser(VideoGame videoGame)
        {
            if (videoGame != null)
            {
                var titleToLower = videoGame.Title.ToLower();
                var entities = DataConnector.ReadAsync((entity) => entity.Title.ToLower().Equals(titleToLower));
                var count = entities.Result.Count();

                if (count == 0)
                {
                    return BadRequest($"Failed to update video game because {videoGame.Title} does not exist.");
                }
                else if (count == 1)
                {
                    var entity = entities.Result.First();
                    entity.Description = videoGame.Description;
                    entity.Genre = videoGame.Genre;
                    entity.ReleaseDate = videoGame.ReleaseDate;

                    DataConnector.UpdateAsync(entity);
                    var resourceUrl = Path.Combine(Request.Path.ToString(), Uri.EscapeUriString(entity.Title));
                    return Ok(entity);
                }
                else
                {
                    return Conflict($"Failed to update video game. Too many entries with title: {videoGame.Title}");
                }
            }

            return BadRequest("Invalid video game.");
        }

        #endregion Update

        #region Delete

        /*[HttpDelete]
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
        }*/

        #endregion Delete
    }
}
