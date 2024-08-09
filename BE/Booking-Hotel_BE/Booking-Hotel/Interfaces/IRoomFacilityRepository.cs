using Booking_Hotel.Models;
using Microsoft.AspNetCore.Mvc;

namespace Booking_Hotel.Interfaces
{
    public interface IRoomFacilityRepository
    {
        Task CreateRoomFacility (RoomFacility roomFacility);

        Task<RoomFacility> GetRoomFacility (int id);

        Task<IEnumerable<RoomFacility>> GetRoomFacilities ();

        Task<IActionResult> UpdateRoomFacility (RoomFacility roomFacility);

        Task<bool> RoomFacilityExist (int id);
    }
}
