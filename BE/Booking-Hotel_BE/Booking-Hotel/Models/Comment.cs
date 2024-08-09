using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Booking_Hotel.Models
{
    public class Comment
    {
        public Comment() {
            Status = "Active";
        }
        public int Id { get; set; }

        [StringLength(999)]
        public string CommentText { get; set; }

        public DateTime CreatedAt { get; set; }

        public string? Image { get; set; }

        public string Status { get; set; }

        public string UserID { get; set; }

        [JsonIgnore]
        [ForeignKey("UserID")]
        public User? User { get; set; }

        public int HotelID { get; set; }

        [JsonIgnore]
        [ForeignKey("HotelID")]
        public Hotel? Hotel { get; set; }

        public int? ParentCommentID { get; set; }

        [JsonIgnore]
        [ForeignKey("ParentCommentID")]
        public Comment? ParentComment { get; set; }

        public ICollection<Comment> ChildComments { get; set; } = new List<Comment>();
    }
}
