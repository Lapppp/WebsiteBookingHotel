using Booking_Hotel.Data;
using Booking_Hotel.Interfaces;
using Booking_Hotel.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using Microsoft.EntityFrameworkCore;
using System.Collections;
using System.Data;

namespace Booking_Hotel.Repository
{
    public class AmenityRepository : IAmenityRepository
    {
        private readonly Booking_Hotel_Context _context;

        public AmenityRepository(Booking_Hotel_Context context)
        {
            _context = context;
        }

        public async Task<bool> AmenityExist(int id)
        {
            return await _context.Amenity.AnyAsync(a => a.Id == id);
        }

        public async Task CreateAmenity(Amenity amenity)
        {
            await _context.Amenity.AddAsync(amenity);
        }
    
        public async Task<Amenity> GetAmenity(int id)
        {
            return await _context.Amenity.FindAsync(id);
        }
        
        public async Task<Amenity> GetAmenitiesByRoom(int roomId)
        {
            var amenities = await _context.RoomAmenities
                .Where(ra => ra.RoomId == roomId)
                .Select(ra => ra.Amenity)
                .FirstOrDefaultAsync();

            return amenities;
        }
        public async Task<IEnumerable<Amenity>> GetAmenities()
        {
            return await _context.Amenity.ToListAsync();
        }

        public async Task<IActionResult> UpdateAmenity(Amenity amenity)
        {
            _context.Entry(amenity).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if(!await AmenityExist(amenity.Id))
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

        public async Task DeleteAmenity(int id)
        {
            var amenity = await _context.Amenity.FindAsync(id);
            if(amenity != null)
            {
                _context.Amenity.Remove(amenity);
                await _context.SaveChangesAsync();
            }
        }
    }
}
