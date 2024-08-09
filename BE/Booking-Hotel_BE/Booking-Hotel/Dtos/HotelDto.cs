using Booking_Hotel.Models;

namespace Booking_Hotel.Dtos
{
    public class HotelDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public string? Description { get; set; }

        public int TotalRooms { get; set; }

        public string Policy { get; set; }

        public string Contact { get; set; }

        public DateTime CheckIn { get; set; }

        public DateTime CheckOut { get; set; }

        public string Status { get; set; }
        
        public double cancel { get; set; }
    }
}
