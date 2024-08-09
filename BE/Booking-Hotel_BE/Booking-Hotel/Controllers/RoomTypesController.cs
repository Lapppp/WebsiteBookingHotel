using Booking_Hotel.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Booking_Hotel.Models;
using Microsoft.AspNetCore.Authorization;

namespace Booking_Hotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomTypesController : ControllerBase
    {
        private readonly IUnitOfWork _uow;

        public RoomTypesController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        [HttpGet]
        public async Task<IActionResult> GetRoomTypes()
        {
            var roomTypes = await _uow.RoomTypeRepository.GetRoomTypes();
            return Ok(roomTypes);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetRoomType(int id)
        {
            var roomType = await _uow.RoomTypeRepository.GetRoomType(id);
            return Ok(roomType);
        }
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateRoomType([FromBody] RoomType roomType)
        {
            var checkRoomType = await _uow.RoomTypeRepository.RoomTypeExists(roomType.Id);
            if (checkRoomType)
            {
                return BadRequest();
            }

            await _uow.RoomTypeRepository.CreateRoomType(roomType);
            var result = await _uow.SaveAsync();
            if (!result)
            {
                return BadRequest();
            }
            return CreatedAtAction(nameof(GetRoomType), new { id = roomType.Id }, roomType);
        }
       
        
        [HttpPut]
        [Route("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateRoomType(int id, RoomType roomType)
        {
            if (id != roomType.Id)
            {
                return BadRequest();
            }
            return await _uow.RoomTypeRepository.UpdateRoomType(roomType);
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteRoomType(int id)
        {
            await _uow.RoomTypeRepository.DeleteRoomType(id);
            var result = await _uow.SaveAsync();
            if (!result)
            {
                return BadRequest();
            }
            return Ok();
        }


        /*[HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateRoomType(RoomType roomType)
        {
            var checkRoomType = await _uow.RoomTypeRepository.RoomTypeExists(roomType.ID);
            if (checkRoomType)
            {
                return BadRequest();
            }

            await _uow.RoomTypeRepository.CreateRoomType(roomType);
            var result = await _uow.SaveAsync();
            if (!result)
            {
                return BadRequest();
            }
            return Ok();
        }*/

        /*[HttpPut]
        [Route("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateRoomType(int id, RoomType roomType)
        {
            if (id != roomType.ID)
            {
                return BadRequest();
            }

            var checkRoomType = await _uow.RoomTypeRepository.RoomTypeExists(id);
            if (checkRoomType == false)
            {
                return NotFound();
            }

            await _uow.RoomTypeRepository.UpdateRoomType(roomType);
            var result = await _uow.SaveAsync();
            if (!result)
            {
                return BadRequest();
            }
            return Ok();
        }*/

        /*[HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteRoomType(int id)
        {
            var checkRoomType = await _uow.RoomTypeRepository.RoomTypeExists(id);
            if (checkRoomType == false)
            {
                return NotFound();
            }

            await _uow.RoomTypeRepository.DeleteRoomType(id);
            var result = await _uow.SaveAsync();
            if (!result)
            {
                return BadRequest();
            }
            return Ok();
        }*/
    }
}
