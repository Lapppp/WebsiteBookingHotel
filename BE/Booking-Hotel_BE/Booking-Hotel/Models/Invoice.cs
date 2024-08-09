using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Booking_Hotel.Models
{
    public class Invoice
    {
        public Invoice()
        {
            GenerateBookingId();
            Status = "Active";
        }

        [Key]
        public string Id { get; set; }  // Change Id type to string

        public double Net { get; set; }

        public DateTime Date { get; set; } = DateTime.Now;

        public double Total { get; set; }

        public double? Tax { get; set; }

        public DateTime DueDate { get; set; } = DateTime.Now;

        public double? Discount { get; set; }

        [StringLength(10)]
        public string Currency { get; set; }

        [StringLength(50)]
        public string Status { get; set; }

        public string BookingId { get; set; }

        [JsonIgnore]
        [ForeignKey("BookingId")]
        public Booking? Booking { get; set; }

        private void GenerateBookingId()
        {
            Id = DateTime.Now.ToString("yyyyMMddHHmmssfff");
        }
    }
}
