using System;

namespace VgInventory.Infra.WebApi.Models
{
    public class UserCredential : ICosmosDbModel
    {
        public string Id { get; set; }
        public string Password { get; set; }

        public string GetContainerId() { return nameof(UserCredential); }
        public string GetId() { return Id; }
        public string GetPartitionKeyPath() { return "/id"; }
    }
}
