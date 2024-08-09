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
    public class HotelRepository : IHotelRepository
    {
        private readonly Booking_Hotel_Context _context;

        public HotelRepository(Booking_Hotel_Context context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Hotel>> GetHotels()
        {
            return await _context.Hotels.Include(h => h.Images).ToListAsync();
        }
        

        public async Task<Hotel> GetHotel(int id)
        {
            return await _context.Hotels.Include(h => h.Images).FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task<Hotel> GetHotelByName(string name)
        {
            return await _context.Hotels.FirstOrDefaultAsync(h => h.Name == name);
        }

        public async Task<bool> HotelExists(int id)
        {
            return await _context.Hotels.AnyAsync(x => x.Id == id);
        }

        public async Task CreateHotel(Hotel hotel)
        {
            await _context.Hotels.AddAsync(hotel);
        }

        public async Task<IActionResult> UpdateHotel(Hotel hotel)
        {
            _context.Entry(hotel).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await HotelExists(hotel.Id))
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
        public async Task DeleteHotel(int id)
        {
            var hotel = await _context.Hotels.FindAsync(id);
            if(hotel != null)
            {
                hotel.Status = "Không hoạt động";
            }
        }

       

        public async Task<IEnumerable<Image>> GetImagesByHotelId(int hotelId)
        {
            return await _context.Images.Where(i => i.HotelID == hotelId).ToListAsync();
        }
    }
}

