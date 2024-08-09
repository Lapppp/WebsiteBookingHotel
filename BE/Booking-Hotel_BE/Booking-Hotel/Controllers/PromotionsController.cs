using Booking_Hotel.Interfaces;
using Booking_Hotel.Models;
using System.Text.Json;
using System.Text.Json.Serialization;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Booking_Hotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PromotionsController : ControllerBase
    {
        private readonly IUnitOfWork _uow;

        public PromotionsController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        [HttpGet]
        public async Task<IActionResult> GetPromotion()
        {
            var promotion = await _uow.PromotionRepository.GetPromotion();
            return Ok(promotion);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetPromotion(int id)
        {
            var promotion = await _uow.PromotionRepository.GetPromotion(id);
            return Ok(promotion);
        }
            
        [HttpGet]
        [Route("GetPromotionsByHotelID/{hotelID}")]
        public async Task<IActionResult> GetPromotionsByHotelID(int hotelID)
        {
            var promotions = await _uow.PromotionRepository.GetPromotions(hotelID);
            var options = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.IgnoreCycles,
                MaxDepth = 100 // Increase max depth if needed
            };

            string json = JsonSerializer.Serialize(promotions, options);
            return Ok(json);
        }
        
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreatePromotion(Promotion promotion) {
            var checkPromotion = await _uow.PromotionRepository.PromotionExist(promotion.Id);
            if (checkPromotion == true)
            {
                return BadRequest();
            }
            await _uow.PromotionRepository.CreatePromotion(promotion);
            var result = await _uow.SaveAsync();
            if (!result)
            {
                return BadRequest();
            }
            return Ok();
        }
        

        [HttpPut]
        [Route("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdatePromotion(int id, Promotion promotion)
        {
            if (id != promotion.Id)
            {
                return BadRequest();
            }
            return await _uow.PromotionRepository.UpdatePromotion(promotion);
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeletePromotion(int id)
        {
            await _uow.PromotionRepository.DeletePromotion(id);
            var result = await _uow.SaveAsync();
            if(!result)
            {
                return BadRequest();
            }
            return Ok();
        }
    }
}
