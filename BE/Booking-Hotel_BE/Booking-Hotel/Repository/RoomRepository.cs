using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Booking_Hotel.Data;
using Booking_Hotel.Dtos;
using Booking_Hotel.Interfaces;
using Booking_Hotel.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Booking_Hotel.Repository
{
    public class RoomRepository : IRoomRepository
    {
        private readonly Booking_Hotel_Context _context;

        public RoomRepository(Booking_Hotel_Context context)
        {
            _context = context;
        }
        
        public async Task CreateRoom(Room room)
        {
            await _context.Rooms.AddAsync(room);
        }

        public async Task DeleteRoom(int id)
        {
            var room = await _context.Rooms.FindAsync(id);
            if(room != null)
            {
                room.Status = "Inactive";
            }
        }
        public async Task<IEnumerable<RoomDto>> GetRooms(int hotelID)
        {
            var rooms = await _context.Rooms
                .Include(r => r.RoomRoomTypes)
                .Include(r => r.Hotel)
                .Include(r => r.RoomAmenities)
                .ThenInclude(ra => ra.Amenity)
                .Where(r => r.HotelID == hotelID)
                .ToListAsync();

            var roomDtos = rooms.Select(r => new RoomDto
            {
                Id = r.Id,
                RoomNumber = r.RoomNumber,
                Description = r.Description,
                Price = r.Price,
                Capacity = r.Capacity,
                Floor = r.Floor,
                Size = r.Size,
                View = r.View,
                Status = r.Status,
                HotelID = r.HotelID,
                Hotel = r.Hotel,
                Amenities = r.RoomAmenities.Select(ra => ra.AmenityId).ToList(),
                RoomTypes = r.RoomRoomTypes.Select(rt => rt.RoomTypeId).ToList()
            });

            return roomDtos;
        }

        public async Task<IEnumerable<RoomDto>> GetRooms()
        {
            var rooms = await _context.Rooms
                .Include(r => r.RoomRoomTypes)
                .Include(r => r.Hotel)
                .Include(r => r.RoomAmenities)
                    .ThenInclude(ra => ra.Amenity)
                .ToListAsync();

            var roomDtos = rooms.Select(r => new RoomDto
            {
                Id = r.Id,
                RoomNumber = r.RoomNumber,
                Description = r.Description,
                Price = r.Price,
                Capacity = r.Capacity,
                Floor = r.Floor,
                Size = r.Size,
                View = r.View,
                Status = r.Status,
                HotelID = r.HotelID,
                Hotel = r.Hotel,
                Amenities = r.RoomAmenities.Select(ra => ra.AmenityId).ToList(),
                RoomTypes = r.RoomRoomTypes.Select(rt => rt.RoomTypeId).ToList()
            });

            return roomDtos;
        }

        public async Task<Room> GetRoom(int id)
        {
            return await _context.Rooms.Include(r => r.RoomRoomTypes)
                .ThenInclude(r => r.RoomType)
                .Include(r => r.Hotel)
                .Include(r => r.RoomAmenities)
                .ThenInclude(r => r.Amenity)
                .FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<bool> RoomExists(int id)
        {
            return await _context.Rooms.AnyAsync(r => r.Id == id);
        }

        public async Task<IActionResult> UpdateRoom(Room room)
        {
            _context.Entry(room).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if(!await RoomExists(room.Id))
                {
                    return new NotFoundResult();
                }
                else
                {
                    throw;
                }
            }
            return new OkResult();
        }
    }
}