using Booking_Hotel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Booking_Hotel.Interfaces
{
    public interface IRoomRoomTypeRepository
    {
        Task<IEnumerable<RoomRoomType>> GetRoomRoomTypes(int roomId);
        void AddRange(IEnumerable<RoomRoomType> roomRoomTypes);
        void RemoveRange(IEnumerable<RoomRoomType> roomRoomTypes);
    }
}
