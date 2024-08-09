using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Booking_Hotel.Models
{
    public class Image
    {
        public int Id { get; set; }

        [Required]
        public string PublicImageId { get; set; }

        [Required]
        [StringLength(255)]
        public string URL { get; set; }

        [StringLength(999)]
        public string? Description { get; set; }

        public int? HotelID { get; set; }

        [JsonIgnore]
        [ForeignKey("HotelID")]
        public Hotel? Hotel { get; set;}
        public string? UserID { get; set; }

        [JsonIgnore]
        [ForeignKey("UserID")]
        public User? User { get; set;}
    }
}
