using System;
using System.Linq;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging.Abstractions;
using Xunit;
using VgInventory.Infra.WebApi.Controllers;
using VgInventory.Infra.WebApi.DataConnectors;
using VgInventory.Infra.WebApi.Models;

namespace VgInventory.Infra.WebApi.Tests
{
    public class UserControllerUnitTests
    {
        public UserController Controller { get; }

        public UserControllerUnitTests()
        {
            Controller = CreateUserController();
        }

        [Fact]
        public void ConstructorNoThrowExeption()
        {
            var logger = NullLogger<UserController>.Instance;
            var dataConnector = new MockDataConnector<User>();
            var Controller = new UserController(dataConnector, logger);
        }

        [Fact]
        public void CreateUserAddsValidUserToDatabase()
        {
            var newUser = CreateUser();
            Controller.CreateUser(newUser);

            var entities = Controller.ReadUser(newUser.UserName);
            Assert.True(entities.Count() > 0, "Failed to add user to database.");
            Assert.True(entities.Count() == 1, "Found multiple users with the same user name.");

            var foundUser = entities.First();
            Assert.True(foundUser.Id != newUser.Id, "Id should have been assigned by data connector.");
            Assert.True(foundUser.Email.Equals(newUser.Email), $"User email from database does not match added user. {foundUser.Email}, {newUser.Email}");
            Assert.True(foundUser.UserName.Equals(newUser.UserName), $"User name from database does not match added user. {foundUser.UserName}, {newUser.UserName}");
            Assert.True(foundUser.StartDate != newUser.StartDate, "StartDate should have been assigned by data connector.");
            Assert.True(foundUser.Bio.Length == 0, "Bio should be empty");
            Assert.True(foundUser.AvatarUrl.Length == 0, "AvatarUrl should be empty");
        }

        [Fact]
        public void CreateUserWithInvalidEmailShouldNotAddUserToDatabase()
        {
            var invalidEmails = new string[] {
                null,
                "",
                "plainaddress",
                "#@%^%#$@#$@#.com",
                "@example.com",
                "Joe Smith <email@example.com>",
                "email.example.com",
                "email@example@example.com",
                "email@example.com (Joe Smith)",
            };

            foreach(string invalidEmail in invalidEmails) {
                var newUser = CreateUser();
                newUser.Email = invalidEmail;
                Controller.CreateUser(newUser);

                var entities = Controller.ReadUser(newUser.UserName);
                Assert.True(entities.Count() == 0, $"User with invalid email `{invalidEmail}` should not be added to database.");
            }
        }

        [Fact]
        public void CreateUserWithInvalidUserNameShouldNotAddUserToDatabase()
        {
            var InvalidUserNames = new string[] {
                null,
                "",
                "a",
                "abcde",
                "abcdefghijklmnopqrstr",
                "abcdefghijklmnopqrstruvwxyz",
                "abc__123",
                "abc--123",
                "abc..123",
                "abc  123",
                "_abcdef",
                "abcdef_",
                "abc.123.def",
                "No@Symbols",
                "No!Symbols"
            };          

            foreach(string invalidUserName in InvalidUserNames) {
                var newUser = CreateUser();
                newUser.UserName = invalidUserName;
                Controller.CreateUser(newUser);

                var entities = Controller.ReadUser(newUser.UserName);
                Assert.True(entities.Count() == 0, $"User with invalid user name `{invalidUserName}` should not be added to database.");
            }
        }

        [Fact]
        public void ReadUserReturnsEmptyListWhenUserNameNotFound()
        {
            var entities = Controller.ReadUser("someNonExistingUserName");
            Assert.True(entities.Count() == 0, "Query should return an empty list.");
        }

        [Fact]
        public void ReadUserReturnsListWithOneEntityWhenUserNameFound()
        {
            var allEntities = Controller.ReadAllUsers();
            Assert.True(allEntities.Count() > 0);

            var userNameToQuery = allEntities.First().UserName;
            var entities = Controller.ReadUser(userNameToQuery);
            Assert.True(entities.Count() == 1, "Query should only return 1 user");
        }

        [Fact]
        public void UpdateUserShouldNotUpdateWhenUserNameNotFound()
        {
            var mockData = "<<mock>>";

            var userToUpdate = CreateUser();
            userToUpdate.UserName = "someNonExistingUserName";
            userToUpdate.Bio = mockData;
            userToUpdate.AvatarUrl = mockData;

            Controller.UpdateUser(userToUpdate);

            var entities = Controller.ReadAllUsers();
            var foundUser = entities.ToList().Find((u) => u.Bio.Contains(mockData) || u.AvatarUrl.Contains(mockData));
            Assert.True(foundUser == null, "Non-existing user should not modify database");
        }

        [Fact]
        public void UpdateUserShouldUpdateWhenUserNameFound()
        {
            var mockData = "<<mock>>";

            var userToUpdate = Controller.ReadAllUsers().First();
            userToUpdate.Bio = mockData;
            userToUpdate.AvatarUrl = mockData;

            Controller.UpdateUser(userToUpdate);

            var entities = Controller.ReadUser(userToUpdate.UserName);
            var userFound = entities.First();
            Assert.True(userToUpdate.Bio.Equals(userFound.Bio), "User Bio in database should match updated user.");
            Assert.True(userToUpdate.AvatarUrl.Equals(userFound.AvatarUrl), "User AvatarUrl in database should match updated user.");
        }

        [Fact]
        public void DeleteUserDeletesValidUserFromDatabase()
        {
            var allUsersCount = Controller.ReadAllUsers().Count();

            var userToDelete = Controller.ReadAllUsers().First();
            Controller.DeleteUser(userToDelete);

            var currentUsers = Controller.ReadAllUsers();
            var currentUsersCount = currentUsers.Count();

            var entities = Controller.ReadUser(userToDelete.UserName);
            Assert.True(entities.Count() == 0, "Failed to delete user from database");
            Assert.True((allUsersCount - 1) == currentUsersCount,
                $"Failed to remove only one user. Before {allUsersCount}. After {currentUsersCount}."); 
        }

        [Fact]
        public void DeleteUserShouldNotModifyDatabaseWithInvalidUser()
        {
            var allUsers = Controller.ReadAllUsers();
            var invalidUser = CreateUser();
            Controller.DeleteUser(invalidUser);
            var currentUsers = Controller.ReadAllUsers();
            Assert.True(allUsers.Count() == currentUsers.Count(), "Invalid user should not modify database"); 
        }

        private static UserController CreateUserController()
        {
            var logger = NullLogger<UserController>.Instance;
            var dataConnector = new MockDataConnector<User>();
            var controller = new UserController(dataConnector, logger);
            controller.ControllerContext.HttpContext = new DefaultHttpContext();
            return controller;
        }

        private static User CreateUser()
        {
            string guid = Guid.NewGuid().ToString();
            return new User
                {
                    Id = string.Empty,
                    Email = "anyUser" + guid.Substring(0,6) + "@email.com",
                    UserName = "anyUser" + guid.Substring(0,6),
                    StartDate = default(DateTime),
                    Bio = string.Empty,
                    AvatarUrl = string.Empty
                };
        }
    }
}
