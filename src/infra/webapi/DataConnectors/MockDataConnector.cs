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
            new User() { Id = "fa98cc2a-4477-4e68-a9f9-a9684cacda9b", Email = "user1@email.com", UserName = "SomeUser1", StartDate = DateTime.Now.AddMonths(-1), Bio = "What's a pirate's favorite letter. Ay, it 'tis the C.", AvatarUrl = "https://ima.com/avatar1.png" },
            new User() { Id = "79a7e16d-1958-4ecc-ac95-fd7e6a0ecb35", Email = "user2@email.com", UserName = "SomeUser2", StartDate = DateTime.Now.AddMonths(-2), Bio = "Work hard, play hard.", AvatarUrl = "https://ima.com/avatar2.png" },
            new User() { Id = "34f4957b-a558-4aa8-be2c-0b17f0c2aa00", Email = "user3@email.com", UserName = "SomeUser3", StartDate = DateTime.Now.AddMonths(-3), Bio = "Boop", AvatarUrl = "https://ima.com/avatar3.png" },
            new User() { Id = "c6d18c97-6596-453b-826e-538423ae1521", Email = "user4@email.com", UserName = "SomeUser4", StartDate = DateTime.Now.AddMonths(-4), Bio = "Nerf this!", AvatarUrl = "https://ima.com/avatar4.png" },
            new User() { Id = "192c2056-5fc5-44a8-8c94-a6b9bcc60b17", Email = "user5@email.com", UserName = "SomeUser5", StartDate = DateTime.Now.AddMonths(-5), Bio = "Hi, I'm Boxee!", AvatarUrl = "https://ima.com/avatar5.png" },
        }.ToList();

        private static List<UserCredential> UserCredentialTable = new[]
        {
            new UserCredential() { Id = UserTable[0].Id, Password = "Password1" },
            new UserCredential() { Id = UserTable[1].Id, Password = "Password2" },
            new UserCredential() { Id = UserTable[2].Id, Password = "Password3" },
            new UserCredential() { Id = UserTable[3].Id, Password = "Password4" },
            new UserCredential() { Id = UserTable[4].Id, Password = "Password5" },
        }.ToList();

        private static List<VideoGame> VideoGamesTable = new[]
        {
            new VideoGame() { Id = "08ab8d1d-b1fd-4344-8953-c993400b1482", Title = "Overwatch", Genre = new string[]{"Action", "FPS"}, Description = "Overwatch is set sixty years into the future of a fictionalized Earth, thirty years after the resolution of what is known as the \"Omnic Crisis.\"", ReleaseDate = DateTime.Parse("May 24, 2016")},
            new VideoGame() { Id = "837bab87-2cbb-4ec8-867d-15aabdd430ab", Title = "Phoenix Wright: Ace Attorney", Genre = new string[]{"Visual Novel"}, Description = "hoenix Wright, a newly hired defense attorney at the Fey & Co. law firm, agrees to represent his childhood friend Larry Butz, who has been charged with the murder of his girlfriend, Cindy Stone. With the help of his boss and mentor, Mia Fey, Phoenix proves that Frank Sahwit, the prosecution's star witness, is the real murderer.", ReleaseDate = DateTime.Parse("October 12, 2001")},
            new VideoGame() { Id = "931fd660-e1ea-4c61-acc6-9fbb1966e74e", Title = "Final Fantasy VIII", Genre = new string[]{"RPG"}, Description = "Squall and Seifer spar each other while training outside Balamb Garden. Meanwhile, the Republic of Galbadia invades the Dollet Dukedom, forcing Dollet to hire SeeD. The school uses the mission as a final exam for its cadets; with the help of his instructor, Quistis, Squall passes the mission's prerequisite and is grouped with Seifer and Zell. Selphie replaces Seifer mid-mission when the latter disobeys orders and abandons his team. SeeD halts the Galbadian advance; Squall, Zell, and Selphie graduate to SeeD status, but Seifer is disciplined for his disobedience.", ReleaseDate = DateTime.Parse("February 11, 1999")},
            new VideoGame() { Id = "07df46fe-7a69-467a-ae7b-e7ee1a156021", Title = "Gris", Genre = new string[]{"Platform", "Adventure"}, Description = "The game follows a girl named Gris, who wakes up in the palm of a crumbling statue of a woman. She attempts to sing out, but quickly becomes choked up and the statue's hands crumble, dropping her to the colourless earth below.", ReleaseDate = DateTime.Parse("December 13, 2018")},
            new VideoGame() { Id = "69e65c3c-efcd-4066-8f2f-a87cffeec617", Title = "Cat Quest", Genre = new string[]{"Action", "RPG"}, Description = "The game is set in an open world kingdom called Felingard. The player takes controls of an anthropomorphic cat who embarks on a quest to rescue his kidnapped sister.", ReleaseDate = DateTime.Parse("August 8, 2017")},

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
                    return Task.CompletedTask;
                }
            }
            else if (typeof(TEntity) == typeof(UserCredential))
            {
                var item = (UserCredential)Convert.ChangeType(entity, typeof(UserCredential));
                if (!UserCredentialTable.Contains(item))
                {
                    UserCredentialTable.Add(item);
                    return Task.CompletedTask;
                }   
            }
            else if (typeof(TEntity) == typeof(VideoGame))
            {
                var item = (VideoGame)Convert.ChangeType(entity, typeof(VideoGame));
                if (!VideoGamesTable.Contains(item))
                {
                    VideoGamesTable.Add(item);
                    return Task.CompletedTask;
                }
            }

            return Task.FromException(new ArgumentException("Failed to create."));
        }

        public Task DeleteAsync(TEntity entity)
        {
            if (typeof(TEntity) == typeof(User))
            {
                var item = (User)Convert.ChangeType(entity, typeof(User));
                if (UserTable.Contains(item))
                {
                    UserTable.Remove(item);
                    return Task.CompletedTask;
                }
            }
            else if (typeof(TEntity) == typeof(UserCredential))
            {
                var item = (UserCredential)Convert.ChangeType(entity, typeof(UserCredential));
                if (UserCredentialTable.Contains(item))
                {
                    UserCredentialTable.Remove(item);
                    return Task.CompletedTask;
                }  
            }
            else if (typeof(TEntity) == typeof(VideoGame))
            {
                var item = (VideoGame)Convert.ChangeType(entity, typeof(VideoGame));
                if (VideoGamesTable.Contains(item))
                {
                    VideoGamesTable.Remove(item);
                    return Task.CompletedTask;
                }
            }

            return Task.FromException(new ArgumentException("Failed to delete."));
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
            else if (typeof(TEntity) == typeof(VideoGame))
            {
                var entities = (List<TEntity>)Convert.ChangeType(VideoGamesTable, typeof(List<TEntity>));
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
            else if (typeof(TEntity) == typeof(VideoGame))
            {
                var table = (List<TEntity>)Convert.ChangeType(VideoGamesTable, typeof(List<TEntity>));
                var func = expression.Compile();
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
                var userToUpdate = UserTable.Find((u) => u.Id.Equals(item.Id));
                if (userToUpdate != null)
                {
                    int i = UserTable.IndexOf(userToUpdate);
                    UserTable[i].Bio = item.Bio;
                    UserTable[i].AvatarUrl = item.AvatarUrl;
                    return Task.CompletedTask;
                }
            }
            else if (typeof(TEntity) == typeof(UserCredential))
            {
                var item = (UserCredential)Convert.ChangeType(entity, typeof(UserCredential));
                var userCredentialToUpdate = UserCredentialTable.Find((u) => u.Id.Equals(item.Id));
                if (userCredentialToUpdate != null)
                {
                    int i = UserCredentialTable.IndexOf(userCredentialToUpdate);
                    UserCredentialTable[i].Password = item.Password;
                    return Task.CompletedTask;
                }
            }
            else if (typeof(TEntity) == typeof(VideoGame))
            {
                var item = (VideoGame)Convert.ChangeType(entity, typeof(VideoGame));
                var videoGameToUpdate = VideoGamesTable.Find((vg) => vg.Id.Equals(item.Id));
                if (videoGameToUpdate != null)
                {
                    int i = VideoGamesTable.IndexOf(videoGameToUpdate);
                    VideoGamesTable[i].Genre = item.Genre;
                    VideoGamesTable[i].Description = item.Description;
                    return Task.CompletedTask;
                }
            }

            return Task.FromException(new ArgumentException("Failed to update."));
        }
    }
}