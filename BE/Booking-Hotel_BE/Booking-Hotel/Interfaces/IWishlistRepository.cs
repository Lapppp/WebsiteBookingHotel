using Booking_Hotel.Models;
using Microsoft.AspNetCore.Mvc;

namespace Booking_Hotel.Interfaces
{
    public interface IWishlistRepository
    {
        Task CreateWishlist(Wishlist wishlist);
        Task<IEnumerable<Wishlist>> GetWishlist();
        Task<Wishlist> GetWishlist(int id);
        Task<bool> WishlistExist(int id);
        Task<IActionResult> UpdateWishlist(Wishlist wishlist);
        Task DeleteWishlist(int id);
        Task<IEnumerable<Wishlist>> GetWishlistByUserId(string userId);
    }
}
