using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Booking_Hotel.Models;
using Microsoft.AspNetCore.Mvc;

namespace Booking_Hotel.Interfaces
{
    public interface IHotelRepository
    {
        Task<IEnumerable<Hotel>> GetHotels();

        Task<Hotel> GetHotel(int id);
        Task<Hotel> GetHotelByName(string name);
        Task<bool> HotelExists(int id);

        Task CreateHotel(Hotel hotel);

        Task<IActionResult> UpdateHotel(Hotel hotel);
        
        Task DeleteHotel(int id);

        Task<IEnumerable<Image>> GetImagesByHotelId(int hotelId);
    }  
}

