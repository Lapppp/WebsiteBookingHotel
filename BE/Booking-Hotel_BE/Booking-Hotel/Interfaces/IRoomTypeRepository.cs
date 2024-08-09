using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Booking_Hotel.Models;
using Microsoft.AspNetCore.Mvc;

namespace Booking_Hotel.Interfaces
{

    public interface IRoomTypeRepository
    {
        Task<RoomType> GetRoomType(int id);
        
        Task<bool> RoomTypeExists(int id);
        Task<IEnumerable<RoomType>> GetRoomTypes();
        Task CreateRoomType(RoomType roomType);
        
        Task<IActionResult> UpdateRoomType(RoomType roomType);

        Task DeleteRoomType(int id);
        Task<IEnumerable<RoomType>> GetRoomTypesByRoomId(int roomId);
     
    }
}