using Booking_Hotel.Models;

namespace Booking_Hotel.Dtos
{
    public class RoomDto
    {
        public int Id { get; set; }

        public string RoomNumber { get; set; }

        public string? Description { get; set; }

        public double Price { get; set; }

        public double Capacity { get; set; }

        public int Floor { get; set; }

        public int Size { get; set; }

        public string View { get; set; }

        public string Status { get; set; }

        public int HotelID { get; set; }

        public Hotel? Hotel { get; set; }

        public List<int> Amenities { get; set; } = new List<int>();

        public List<int> RoomTypes { get; set; } = new List<int>();
    }
}
