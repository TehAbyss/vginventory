using System;

namespace VgInventory.Infra.WebApi.Models
{
    public class VideoGame
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string[] Genre { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string Description {get; set; }
    }
}