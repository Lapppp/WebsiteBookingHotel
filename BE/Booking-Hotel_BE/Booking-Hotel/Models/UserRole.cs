using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Booking_Hotel.Models
{
    public class UserRole
    {
        public int Id {get; set; }

        public int HotelId {get; set; }

        [ForeignKey("HotelId")]
        public Hotel Hotel { get; set; }

        public string UserId { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }
    }
}