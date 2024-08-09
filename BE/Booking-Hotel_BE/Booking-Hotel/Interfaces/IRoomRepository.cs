using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Booking_Hotel.Dtos;
using Booking_Hotel.Models;
using Microsoft.AspNetCore.Mvc;

namespace Booking_Hotel.Interfaces
{
    public interface IRoomRepository
    {
        Task CreateRoom(Room room);

        Task<bool> RoomExists(int id);

        Task<IEnumerable<RoomDto>> GetRooms();

        Task<Room> GetRoom(int id);

        Task<IActionResult> UpdateRoom(Room room);
        
        Task DeleteRoom(int id);
        
        Task<IEnumerable<RoomDto>> GetRooms(int hotelID);
        
        
        
        
    }
}