using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Booking_Hotel.Models
{
    public class Booking
    {
        public Booking()
        {
            BookingHistories = new List<BookingHistory>();
            Invoices = new List<Invoice>();
            GenerateBookingId();
            Status = "Confirmed";
        }

     

         /*
         [Required]
         public DateTime CheckInDate { get; set; }

         [Required]
         public DateTime CheckOutDate { get; set; }

         public int BookedRooms { get; set; }

         [StringLength(50)]
         public string Status { get; set; }

         public string? UserID { get; set; }

         public string? Note { get; set; }
       
         
         public User? User { get; set; }

        

         // New fields
         public int? RoomId { get; set; }
         [JsonIgnore]
         [ForeignKey("RoomId")]
         
        
         public Room? Room { get; set; }

         public int? PaymentId { get; set; }
         [StringLength(100)]
         public string? Roomtype { get; set; }
        
         
         public PaymentMethod? PaymentMethod { get; set; }


         [StringLength(100)]
         public string? UserName { get; set; }

         [StringLength(15)]
         public string? PhoneNumber { get; set; }


         public decimal? TotalPrice { get; set; }

         public decimal? DiscountID { get; set; }

         public decimal? TotalDiscount { get; set; }

         public string? Mail { get; set; }
         */
         [Key]
         public string? Id { get; set; }
        public string? CustomerName { get; set; }
        public string? Email { get; set; }
        
        public int BookedRooms { get; set; }
        
        public string? PhoneNumber { get; set; }
        public DateTime CheckInDate { get; set; }
        [StringLength(50)]
        public string Status { get; set; }
        public DateTime CheckOutDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public decimal? TotalPrice { get; set; }
        public string? Note { get; set; }
        public string? UserID { get; set; }
        public PaymentMethod? PaymentMethod { get; set; }
        public User? User { get; set; }
        public int NumberPeople{ get; set; }
        public string? UserName { get; set; }
        public int? HotelId { get; set; }
        [JsonIgnore]
        [ForeignKey("HotelId")]
        /*
        "mã giảm giá"
        */
        
        public string? couponCode { get; set; }
        
        public string StatusPayment { get; set; } 
        /*số tiền được giảm*/
        public decimal? Commission { get; set; }
        /*số tiền đã nhận*/
        public decimal? MoneyReceived { get; set; }
        /*id của phương thức thanh toán*/
        public int PaymentId { get; set; }
        [JsonIgnore]
        [ForeignKey("PaymentId")]
        
        /*số tiền đã giảm*/
        public int? RoomId { get; set; }
        [JsonIgnore]
        [ForeignKey("RoomId")]
         
        
        public Room? Room { get; set; }
        public decimal? discount { get; set; }
        
        
        public List<BookingHistory> BookingHistories { get; set; }

        public List<Invoice> Invoices { get; set; }
        private void GenerateBookingId()
        {
            Id = DateTime.Now.ToString("yyyyMMddHHmmssfff");
        }
    }
}