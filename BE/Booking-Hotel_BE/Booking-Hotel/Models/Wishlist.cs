using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace Booking_Hotel.Models
{
    public class Wishlist
    {
        public int Id { get; set; }

        [StringLength(999)]
        public string? Notes { get; set; }

        public DateTime Date { get; set; } = DateTime.Now;

        public string UserID { get; set; }
        [JsonIgnore]
        [ForeignKey("UserID")]
        public User? User { get; set; }

        public int HotelID { get; set; }
        
        [JsonIgnore]
        [ForeignKey("HotelID")]
        public Hotel? Hotel { get; set; }
    }
}
