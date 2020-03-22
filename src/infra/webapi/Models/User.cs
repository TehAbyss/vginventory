using System;

namespace VgInventory.Infra.WebApi.Models
{
    public class User
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public DateTime StartDate { get; set; }
        public string Bio {get; set; }
        public string AvatarUrl { get; set; }
    }
}
