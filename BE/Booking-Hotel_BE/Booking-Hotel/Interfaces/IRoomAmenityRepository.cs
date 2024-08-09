using Booking_Hotel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Booking_Hotel.Interfaces
{
    public interface IRoomAmenityRepository
    {
        Task<IEnumerable<RoomAmenity>> GetRoomAmenities(int roomId);
        void AddRange(IEnumerable<RoomAmenity> roomAmenities);
        void RemoveRange(IEnumerable<RoomAmenity> roomAmenities);
    }
}
