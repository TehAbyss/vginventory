using System;

namespace VgInventory.Infra.WebApi.Models
{
    public class UserVideoGame
    {
        public string UserId { get; set; }
        public string VideoGameId { get; set; }
        public bool IsCompleted { get; set; }
        public bool IsWishListed { get; set; }
        public bool IsOwned { get; set; }
    }
}