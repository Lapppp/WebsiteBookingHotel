using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Booking_Hotel.Data;
using Booking_Hotel.Interfaces;
using Booking_Hotel.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;

namespace Booking_Hotel.Repository
{
    public class BookingHistoryRepository : IBookingHistoryRepository
    {
        private readonly Booking_Hotel_Context _context;

        public BookingHistoryRepository(Booking_Hotel_Context context)
        {
            _context = context;
        }

        public async Task CreateBookingHistory(BookingHistory bookingHistory)
        {
            await _context.AddAsync(bookingHistory);
        }

        public async Task<bool> BookingHistoryExist(int id)
        {
            return await _context.BookingsHistory.AnyAsync(bh => bh.Id == id);
        }

        public async Task<IEnumerable<BookingHistory>> GetBookingHistories(string bookingId)
        {
            return await _context.BookingsHistory.Include(bh => bh.Booking).Where(bh => bh.BookingID == bookingId).ToListAsync();
        }

        public async Task<BookingHistory> GetBookingHistory(int id)
        {
            return await _context.BookingsHistory.Include(bh => bh.Booking).FirstOrDefaultAsync(bh => bh.Id == id);
        }

        public async Task<IActionResult> UpdateBookingHistory(BookingHistory bookingHistory)
        {
            _context.Entry(bookingHistory).State = EntityState.Modified;
            try 
            {
                await _context.SaveChangesAsync();
            }
            catch(DBConcurrencyException)
            {
                if(!await BookingHistoryExist(bookingHistory.Id))
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

        public async Task DeleteBookingHistory(int id)
        {
            var bookingHistory = await _context.BookingsHistory.FindAsync(id);
            if(bookingHistory != null)
            {
                bookingHistory.Status = "Cancelled";
            }
        }
    }
}