using Booking_Hotel.Data;
using Booking_Hotel.Interfaces;
using Booking_Hotel.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace Booking_Hotel.Repository
{
    public class RoomFacilityRepository : IRoomFacilityRepository
    {
        private readonly Booking_Hotel_Context _context;

        public RoomFacilityRepository(Booking_Hotel_Context context)
        {
            _context = context;
        }

        public async Task CreateRoomFacility(RoomFacility roomFacility)
        {
            await _context.RoomsFacility.AddAsync(roomFacility);
        }

        public async Task<IEnumerable<RoomFacility>> GetRoomFacilities()
        {
            return await _context.RoomsFacility.Include(rf => rf.roomFacilityAssociations).ToListAsync();
        }

        public async Task<RoomFacility> GetRoomFacility(int id)
        {
            return await _context.RoomsFacility.Include(rf => rf.roomFacilityAssociations).FirstOrDefaultAsync(rf => rf.Id == id);
        }

        public async Task<bool> RoomFacilityExist(int id)
        {
            return await _context.RoomsFacility.AnyAsync(r => r.Id == id);
        }

         public async Task<IActionResult> UpdateRoomFacility(RoomFacility roomFacility)
        {
            _context.Entry(roomFacility).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await RoomFacilityExist(roomFacility.Id))
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
