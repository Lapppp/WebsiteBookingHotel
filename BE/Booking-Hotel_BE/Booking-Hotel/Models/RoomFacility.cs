using System.ComponentModel.DataAnnotations;

namespace Booking_Hotel.Models
{
    public class RoomFacility
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }

        [StringLength(999)]
        public string? Description { get; set; }

        public List<RoomFacilityAssociation> roomFacilityAssociations { get; set; }
    }
}
