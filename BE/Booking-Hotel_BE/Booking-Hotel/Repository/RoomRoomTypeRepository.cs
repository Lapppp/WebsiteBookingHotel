using Booking_Hotel.Data;
using Booking_Hotel.Interfaces;
using Booking_Hotel.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Booking_Hotel.Repository
{
    public class RoomRoomTypeRepository : IRoomRoomTypeRepository
    {
        private readonly Booking_Hotel_Context _context;

        public RoomRoomTypeRepository(Booking_Hotel_Context context)
        {
            _context = context;
        }

        public async Task<IEnumerable<RoomRoomType>> GetRoomRoomTypes(int roomId)
        {
            return await _context.RoomRoomTypes.Where(rrt => rrt.RoomId == roomId).ToListAsync();
        }

        public void AddRange(IEnumerable<RoomRoomType> roomRoomTypes)
        {
            _context.RoomRoomTypes.AddRange(roomRoomTypes);
        }

        public void RemoveRange(IEnumerable<RoomRoomType> roomRoomTypes)
        {
            _context.RoomRoomTypes.RemoveRange(roomRoomTypes);
        }
    }
}
