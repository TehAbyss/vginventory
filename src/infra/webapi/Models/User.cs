using System;

namespace VgInventory.Infra.WebApi.Models
{
    public class User
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
