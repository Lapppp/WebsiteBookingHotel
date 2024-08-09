using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Booking_Hotel.Data;
using Booking_Hotel.Interfaces;
using Booking_Hotel.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace Booking_Hotel.Repository
{
    public class RoomTypeRepository : IRoomTypeRepository
    {
        private readonly Booking_Hotel_Context _context;

        public RoomTypeRepository(Booking_Hotel_Context context)
        {
            _context = context;
        }
        public async Task<RoomType> GetRoomType(int id)
        {
            return await _context.RoomTypes.FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<IEnumerable<RoomType>> GetRoomTypes()
        {   
            return await _context.RoomTypes.ToListAsync();
        }

        public async Task CreateRoomType(RoomType roomType)
        {
            await _context.RoomTypes.AddAsync(roomType);
        }

        public async Task<IActionResult> UpdateRoomType(RoomType roomType)
        {
            _context.Entry(roomType).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if(!await RoomTypeExists(roomType.Id))
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

        public async Task DeleteRoomType(int id)
        {
            var roomTypes = await _context.RoomTypes.FindAsync(id);
            if(roomTypes != null)
            {
                _context.RoomTypes.Remove(roomTypes);
                await _context.SaveChangesAsync();
            }
        }
        
        public async Task<bool> RoomTypeExists(int id)
        {
            return await _context.RoomTypes.AnyAsync(r => r.Id == id);
        }
        public async Task<IEnumerable<RoomType>> GetRoomTypesByRoomId(int roomId)
        {
            return await _context.RoomRoomTypes
                .Where(rrt => rrt.RoomId == roomId)
                .Select(rrt => rrt.RoomType)
                .ToListAsync();
        }
    
    }
    
}