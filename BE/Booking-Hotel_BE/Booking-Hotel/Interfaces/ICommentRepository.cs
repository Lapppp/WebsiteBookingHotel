using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Booking_Hotel.Models;
using Microsoft.AspNetCore.Mvc;

namespace Booking_Hotel.Interfaces
{
    public interface ICommentRepository
    {
        Task CreateComment(Comment comment);
        Task<IEnumerable<Comment>> GetComments();
        Task<IEnumerable<Comment>> GetComments(int hotelID);
        Task<Comment> GetComment(int id);
        Task<bool> CommentExist(int id);
        Task<IActionResult> UpdateComment(Comment comment);
        Task DeleteComment(int id);
    }
}