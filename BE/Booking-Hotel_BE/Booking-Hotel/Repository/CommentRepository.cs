using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Booking_Hotel.Data;
using Booking_Hotel.Interfaces;
using Booking_Hotel.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Booking_Hotel.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly Booking_Hotel_Context _context;
        public CommentRepository(Booking_Hotel_Context context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Comment>> GetComments(int hotelID)
        {
            return await _context.Comments.Include(i => i.User)
                .Include(c => c.Hotel)
                .Include(c => c.ChildComments)
                .Where(c => c.HotelID == hotelID)
                .ToListAsync();
        }
        public async Task<bool> CommentExist(int id)
        {
            return await _context.Comments.AnyAsync(b => b.Id == id);
        }

        public async Task CreateComment(Comment comment)
        {
            await _context.Comments.AddAsync(comment);
           
        }

        public async Task DeleteComment(int id)
        {
            var comment = await _context.Comments.FindAsync(id);
            if (comment != null)
            {
                comment.Status = "Hide";
                _context.Comments.Update(comment);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<Comment> GetComment(int id)
        {
            return await _context.Comments.Include(i => i.User)
                .Include(c => c.ChildComments)
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<IEnumerable<Comment>> GetComments()
        {
            return await _context.Comments.Include(i => i.User)
                .Include(c => c.Hotel)
                .Include(c => c.ChildComments)
                .ToListAsync();
        }

        public async Task<IActionResult> UpdateComment(Comment comment)
        {
            _context.Entry(comment).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                if (!await CommentExist(comment.Id))
                {
                    return new NotFoundResult();
                }
                else
                {
                    throw; 
                }
            }
            return new OkResult();
        }
    }
}
        