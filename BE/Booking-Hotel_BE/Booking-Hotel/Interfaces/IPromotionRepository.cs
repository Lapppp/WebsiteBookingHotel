using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Booking_Hotel.Models;
using Microsoft.AspNetCore.Mvc;

namespace Booking_Hotel.Interfaces
{
    public interface IPromotionRepository
    {
        Task CreatePromotion(Promotion promotion);

        Task<bool> PromotionExist(int id);

        Task<IEnumerable<Promotion>> GetPromotion();

        Task<Promotion> GetPromotion(int id);

        Task<IActionResult> UpdatePromotion(Promotion promotion);
        Task<IEnumerable<Promotion>> GetPromotions(int hotelID);
        Task DeletePromotion(int id);
    }
}