using Booking_Hotel.Interfaces;
using Booking_Hotel.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Booking_Hotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WishlistsController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        public WishlistsController(IUnitOfWork uow)
        {
            _uow = uow;
        }
        [HttpGet]
        public async Task<IActionResult> GetWishlist()
        {
            var wishlists = await _uow.WishlistRepository.GetWishlist();
            return Ok(wishlists);
        }
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetWishlist(int id)
        {
            var wishlist = await _uow.WishlistRepository.GetWishlist(id);
            return Ok(wishlist);
        }
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetWishlistByUserId(string userId) // Add this method
        {
            var wishlists = await _uow.WishlistRepository.GetWishlistByUserId(userId);
            return Ok(wishlists);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateWishlist(Wishlist wishlist)
        {
            var checkWishlist = await _uow.WishlistRepository.WishlistExist(wishlist.Id);
            if (checkWishlist == true)
            {
                return BadRequest();
            }
            await _uow.WishlistRepository.CreateWishlist(wishlist);
            var result = await _uow.SaveAsync();
            if (!result)
            {
                return BadRequest();
            }
            return Ok(wishlist);
        }
        [HttpPut]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateWishList(int id, Wishlist wishlist)
        {
            if (id != wishlist.Id)
            {
                return BadRequest();
            }
            return await _uow.WishlistRepository.UpdateWishlist(wishlist);
        }
        [HttpDelete]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteWishList(int id)
        {
            await _uow.WishlistRepository.DeleteWishlist(id);

            var result = await _uow.SaveAsync();
            if (!result)
            {
                return BadRequest();
            }
            return Ok();
        }
    }
}
