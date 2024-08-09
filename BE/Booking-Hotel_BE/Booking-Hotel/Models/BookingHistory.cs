using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Booking_Hotel.Models
{
    public class BookingHistory
    {
        public BookingHistory() {
            Status = "Booked";
        }
        public int Id { get; set; }

        [StringLength(50)]
        public string Status { get; set; }

        public string BookingID { get; set; }

        [JsonIgnore]
        [ForeignKey("BookingID")]
        public Booking? Booking { get; set; }
    }
}
