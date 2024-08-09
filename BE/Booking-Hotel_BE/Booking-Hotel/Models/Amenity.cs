using System.ComponentModel.DataAnnotations;

namespace Booking_Hotel.Models
{
    public class Amenity
    {
        public int Id { get; set; }

        [StringLength(100)]
        public string Icon { get; set; }

        [StringLength(100)]
        public string Category { get; set; }

        [StringLength(100)]
        public string Name { get; set; }

        [StringLength(999)]
        public string? Description { get; set; }

        // Navigation property
        //public ICollection<RoomAmenity> RoomAmenities { get; set; }
    }
}
