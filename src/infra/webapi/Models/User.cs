using System;

namespace VgInventory.Infra.WebApi.Models
{
    public class User : ICosmosDbModel
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public DateTime StartDate { get; set; }
        public string Bio {get; set; }
        public string AvatarUrl { get; set; }

        public string GetContainerId() { return nameof(User); }
        public string GetId() { return Id; }
        public string GetPartitionKeyPath() { return "/id"; }
    }
}
