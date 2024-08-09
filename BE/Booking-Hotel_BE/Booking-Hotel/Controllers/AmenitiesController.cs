using Booking_Hotel.Interfaces;
using Booking_Hotel.Models;
using Booking_Hotel.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Booking_Hotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AmenitiesController : ControllerBase
    {
        private readonly IUnitOfWork _uow;

        public AmenitiesController (IUnitOfWork uow)
        {
            _uow = uow;
        }

        [HttpGet]
        public async Task<IActionResult> GetAmenities()
        {
            var amenity = await _uow.AmenityRepository.GetAmenities();
            return Ok(amenity);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetAmenity(int id)
        {
            var amenity = await _uow.AmenityRepository.GetAmenity(id);

            return Ok(amenity);
        }
        [HttpGet("byRoom/{roomId}")]
        public async Task<IActionResult> GetAmenitiesByRoom(int roomId)
        {
            var amenities = await _uow.AmenityRepository.GetAmenitiesByRoom(roomId);
            return Ok(amenities);
        }
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateAmenity([FromBody] Amenity amenity)
        {
            var checkAmenity = await _uow.AmenityRepository.AmenityExist(amenity.Id);

            if(checkAmenity == true)
            {
                return BadRequest();
            }

            await _uow.AmenityRepository.CreateAmenity(amenity);
            var result = await _uow.SaveAsync();
            if (!result)
            {
                return BadRequest();
            }
            return CreatedAtAction(nameof(GetAmenity), new { id = amenity.Id }, amenity);
        }

        [HttpPut]
        [Route("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateAmenity(int id, Amenity amenity)
        {
            if(id != amenity.Id) { 
                return BadRequest();
            }

            return await _uow.AmenityRepository.UpdateAmenity(amenity);
        }
    }
}
