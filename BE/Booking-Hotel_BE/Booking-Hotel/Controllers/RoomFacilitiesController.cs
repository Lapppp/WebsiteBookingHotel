using Booking_Hotel.Data;
using Booking_Hotel.Interfaces;
using Booking_Hotel.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Booking_Hotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomFacilitiesController : ControllerBase
    {
        private readonly IUnitOfWork _uow;

        public RoomFacilitiesController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        [HttpGet]
        public async Task<IActionResult> GetRoomFacilities()
        {
            var roomFacilities = await _uow.RoomFacilityRepository.GetRoomFacilities();
            return Ok(roomFacilities);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetRoomFacility(int id)
        {
            var roomFacility = await _uow.RoomFacilityRepository.GetRoomFacility(id);
            return Ok(roomFacility);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateRoomFacility(RoomFacility roomFacility)
        {
            var checkRoomFacility = await _uow.RoomFacilityRepository.RoomFacilityExist(roomFacility.Id);

            if(checkRoomFacility == true)
            {
                return BadRequest();
            }

            await _uow.RoomFacilityRepository.CreateRoomFacility(roomFacility);
            var result = await _uow.SaveAsync();
            if(!result)
            {
                return BadRequest();
            }
            return Ok();
        }

        [HttpPut]
        [Route("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateRoomFacility(int id, RoomFacility roomFacility)
        {
            if (id != roomFacility.Id)
            {
                return BadRequest();
            }

            return await _uow.RoomFacilityRepository.UpdateRoomFacility(roomFacility);
        }
    }
}
