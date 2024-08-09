using System;
using System.Text.Json;
using System.Text.Json.Serialization;
using Booking_Hotel.Interfaces;
using Booking_Hotel.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Booking_Hotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly IUnitOfWork _uow;

        public CommentsController(IUnitOfWork uow)
        {
            _uow = uow;
        }

        [HttpGet]
        public async Task<IActionResult> GetComments()
        {
            var comments = await _uow.CommentRepository.GetComments();
            var options = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.IgnoreCycles,
                MaxDepth = 100 // Increase max depth if needed
            };

            string json = JsonSerializer.Serialize(comments, options);
            return Ok(json);
        }

        [HttpGet]
        [Route("GetComment/{id}")]
        public async Task<IActionResult> GetComment(int id)
        {
            var comment = await _uow.CommentRepository.GetComment(id);
            if (comment == null)
            {
                return NotFound();
            }
            return Ok(comment);
        }
        
        
        [HttpGet]
        [Route("GetCommentsByHotelID/{hotelID}")]
        public async Task<IActionResult> GetCommentsByHotelID(int hotelID)
        {
            var comments = await _uow.CommentRepository.GetComments(hotelID);
            var options = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.IgnoreCycles,
                MaxDepth = 100 
            };

            string json = JsonSerializer.Serialize(comments, options);
            return Ok(json);
        }

        

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateComment([FromBody] Comment comment)
        {
            if (comment.ParentCommentID != null && !await _uow.CommentRepository.CommentExist(comment.ParentCommentID.Value))
            {
                return BadRequest("Parent comment does not exist.");
            }

            comment.CreatedAt = DateTime.Now;
            comment.Status = "Active";

            await _uow.CommentRepository.CreateComment(comment);
            var result = await _uow.SaveAsync();
            if (!result)
            {
                return BadRequest("Failed to create comment.");
            }
            return Ok();
        }


        [HttpPut]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateComment(int id, Comment comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }
            return await _uow.CommentRepository.UpdateComment(comment);
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteComment(int id)
        {
            await _uow.CommentRepository.DeleteComment(id);
            var result = await _uow.SaveAsync();
            if (!result)
            {
                return BadRequest();
            }
            return Ok();
        }
    }
}
