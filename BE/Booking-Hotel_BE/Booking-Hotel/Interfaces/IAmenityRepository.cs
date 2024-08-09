using Booking_Hotel.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections;

namespace Booking_Hotel.Interfaces
{
    public interface IAmenityRepository
    {
        Task CreateAmenity(Amenity amenity);
        
        Task<Amenity> GetAmenity(int id);
        Task<Amenity> GetAmenitiesByRoom(int roomId);
        Task<IEnumerable<Amenity>> GetAmenities();

        Task<IActionResult> UpdateAmenity(Amenity amenity);

        Task <bool> AmenityExist (int id);

        Task DeleteAmenity(int id);
    }
}
