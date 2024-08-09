using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Booking_Hotel.Models
{
    public class RoomAmenity
    {
        public int Id { get; set; }

        [ForeignKey("Room")]
        public int RoomId { get; set; }
        public Room Room { get; set; }

        [ForeignKey("Amenity")]
        public int AmenityId { get; set; }
        public Amenity Amenity { get; set; }
    }
}
