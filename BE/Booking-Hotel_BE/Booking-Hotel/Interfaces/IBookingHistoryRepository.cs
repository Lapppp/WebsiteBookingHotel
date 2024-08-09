using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Booking_Hotel.Models;
using Microsoft.AspNetCore.Mvc;

namespace Booking_Hotel.Interfaces
{
    public interface IBookingHistoryRepository
    {
        Task CreateBookingHistory(BookingHistory bookingHistory);

        Task<bool> BookingHistoryExist(int id);

        Task<IEnumerable<BookingHistory>> GetBookingHistories(string bookingId);

        Task<BookingHistory> GetBookingHistory(int id);

        Task<IActionResult> UpdateBookingHistory(BookingHistory bookingHistory);

        Task DeleteBookingHistory(int id);
    }
}