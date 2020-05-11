using System;

namespace VgInventory.Infra.WebApi.Models
{
    public class UserVideoGame : ICosmosDbModel
    {
        public string Id {get; set; }
        public string UserId { get; set; }
        public string VideoGameId { get; set; }
        public bool IsCompleted { get; set; }
        public bool IsWishListed { get; set; }
        public bool IsOwned { get; set; }

        public string GetContainerId() { return nameof(UserVideoGame); }
        public string GetId() { return Id; }
        public string GetPartitionKeyPath() { return "/id"; }
    }
}