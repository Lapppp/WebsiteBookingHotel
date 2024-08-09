using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Booking_Hotel.Models
{
    public class Review
    {
        public Review() {
            Status = "Active";
        }
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Title { get; set; }

        [Required]
        public double Rating { get; set; }

        [StringLength(50)]
        public string Status { get; set; }

        public DateTime CreatedAt { get; set; }
        
        
        public int HotelID { get; set; }

        [JsonIgnore]
        [ForeignKey("HotelID")]
        public Hotel? Hotel { get; set; }

        [Required]
        public string BookingId { get; set; }

        [JsonIgnore]
        [ForeignKey("BookingId")]
        public Booking? Booking { get; set; }
        
        
        
        
        [Required]
        public string UserID { get; set; }

        [JsonIgnore]
        [ForeignKey("UserID")]
        public User? User { get; set; }
    }
}
