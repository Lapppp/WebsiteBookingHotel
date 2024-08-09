using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Booking_Hotel.Models
{
    public class RoomType
    {
        public int Id { get; set; }

        [StringLength(100)]
        public string Name { get; set; }

        [StringLength(100)]
        public string? Description { get; set; }

        //// Relationship with Room
        //public ICollection<RoomRoomType> RoomRoomTypes { get; set; }
    }
}
