using System;

namespace VgInventory.Infra.WebApi.Models
{
    public class UserVideoGame
    {
        public string Id { get; set; }
        public string UserProfileId { get; set; }
        public bool UserCompleted { get; set; }
        public bool WishList { get; set; }
        public bool Owned { get; set; }
    }
}