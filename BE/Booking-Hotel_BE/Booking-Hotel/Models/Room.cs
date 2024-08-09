using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Booking_Hotel.Models
{
    public class Room
    {
        public Room() {
            Status = "Active";
        }
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string RoomNumber { get; set; }

        [StringLength(999)]
        public string? Description { get; set; }

        [Required]
        public double Price { get; set; }

        public double Capacity { get; set; } 
        

        public int Floor { get; set; }

        public int Size { get; set; }

        public string View { get; set; }

        [StringLength(50)]
        public string Status { get; set; }

        public int HotelID { get; set; }

        [ForeignKey("HotelID")]
        public Hotel? Hotel { get; set; }

        // Navigation property
        //public ICollection<RoomFacilityAssociation> RoomFacilityAssociations { get; set; }

        //public ICollection<Review> Reviews { get; set; }

        // New Navigation property for many-to-many relationship with Amenity
        public ICollection<RoomAmenity> RoomAmenities { get; set; }

        public ICollection<RoomRoomType> RoomRoomTypes { get; set; }
    }
}
