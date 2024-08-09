using System.ComponentModel.DataAnnotations.Schema;

namespace Booking_Hotel.Models
{
    public class RoomFacilityAssociation
    {
        public int Id { get; set; }

        public int RoomFacilityID { get; set; }

        [ForeignKey("RoomFacilityID")]
        public RoomFacility? RoomFacility { get; set; }

        public int RoomID { get; set; }

        [ForeignKey("RoomID")]
        public Room? Room { get; set; }
    }
}
