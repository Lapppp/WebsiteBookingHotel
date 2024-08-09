using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Booking_Hotel.Data;
using Booking_Hotel.Interfaces;
using Booking_Hotel.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Booking_Hotel.Repository
{
    public class BookingRepository : IBookingRepository
    {
        private readonly Booking_Hotel_Context _context;

        public BookingRepository(Booking_Hotel_Context context)
        {
            _context = context;
        }

        public async Task CreateBooking(Booking booking)
        {
            booking.Id = DateTime.Now.ToString("yyyyMMddHHmmssfff");
            await _context.Booking.AddAsync(booking);
          
        }

        public async Task<bool> BookingExist(string id)
        {
            return await _context.Booking.AnyAsync(b => b.Id == id);
        }

        public async Task<Booking> GetBooking(string id)
        {
            return await _context.Booking
                .Include(b => b.User)
                .Include(b => b.BookingHistories)
                .FirstOrDefaultAsync(b => b.Id == id);
        }

        public async Task<IEnumerable<Booking>> GetBookings()
        {
            return await _context.Booking
                .Include(b => b.User)
                .Include(b => b.BookingHistories)
                .ToListAsync();
        }

        public async Task<IActionResult> UpdateBooking(Booking booking)
        {
            _context.Entry(booking).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await BookingExist(booking.Id))
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

        public async Task DeleteBooking(string id)
        {
            var booking = await _context.Booking.FindAsync(id);
            if (booking != null)
            {
                booking.Status = "đã huỷ";
             
            }
        }
        
        public async Task<IEnumerable<Booking>> SearchBookings(string searchTerm)
        {
            return await _context.Booking
                .Include(b => b.User)
                .Include(b => b.BookingHistories)
                .Where(b => b.Id.Contains(searchTerm) || b.User.UserName.Contains(searchTerm))
                .ToListAsync();
        }

        public async Task<int> GetTotalBookings()
        {
            return await _context.Booking.CountAsync();
        }

        public async Task<int> GetBookingsByStatus(string status)
        {
            return await _context.Booking.CountAsync(b => b.Status == status);
        }
    }
}
