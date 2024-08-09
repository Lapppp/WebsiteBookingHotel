using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Booking_Hotel.Models
{
    public class Hotel
    {
        public Hotel() {
            Status = "Active";
        }
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        [Required]
        [StringLength(255)]
        public string Address { get; set; }

        
        
        
        
        [Required]
        [StringLength(100)]
        public string City { get; set; }

        [Required]
        [StringLength(100)]
        public string Country { get; set; }

        [StringLength(999)]
        public string? Description { get; set; }

        public int TotalRooms { get; set; }

        [StringLength(999)]
        public string Policy { get; set; }

        [StringLength(255)]
        public string Contact { get; set; }

        [Required]
        public DateTime CheckIn { get; set; }

        [Required]
        public DateTime CheckOut { get; set; }
        
        public double cancel { get; set; }
        
        public string Status { get; set; }

        //public List<Room> Rooms { get; set; }

        public ICollection<Image> Images { get; set; } = new List<Image>();

        //public List<Wishlist> Wishlists { get; set; }

        //public List<Promotion> Promotions { get; set; }
    }
}
