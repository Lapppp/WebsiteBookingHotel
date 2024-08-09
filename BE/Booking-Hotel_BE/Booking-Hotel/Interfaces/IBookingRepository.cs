using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Booking_Hotel.Models;
using Microsoft.AspNetCore.Mvc;

namespace Booking_Hotel.Interfaces
{
    public interface IBookingRepository
    {
        Task CreateBooking(Booking booking);

        Task<bool> BookingExist(string id);

        Task<Booking> GetBooking(string id);

        Task <IEnumerable<Booking>> GetBookings();

        Task<IActionResult> UpdateBooking(Booking booking);

        Task DeleteBooking(string id);
        
        Task<IEnumerable<Booking>> SearchBookings(string searchTerm);

        Task<int> GetTotalBookings();

        Task<int> GetBookingsByStatus(string status);
        
    }
}