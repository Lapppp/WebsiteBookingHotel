using Booking_Hotel.Data;
using Booking_Hotel.Interfaces;
using Booking_Hotel.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Booking_Hotel.Repository
{
    public class RoomAmenityRepository : IRoomAmenityRepository
    {
        private readonly Booking_Hotel_Context _context;

        public RoomAmenityRepository(Booking_Hotel_Context context)
        {
            _context = context;
        }

        public async Task<IEnumerable<RoomAmenity>> GetRoomAmenities(int roomId)
        {
            return await _context.RoomAmenities.Where(ra => ra.RoomId == roomId).ToListAsync();
        }

        public void AddRange(IEnumerable<RoomAmenity> roomAmenities)
        {
            _context.RoomAmenities.AddRange(roomAmenities);
        }

        public void RemoveRange(IEnumerable<RoomAmenity> roomAmenities)
        {
            _context.RoomAmenities.RemoveRange(roomAmenities);
        }
    }
}
