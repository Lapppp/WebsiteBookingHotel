using AutoMapper;
using Booking_Hotel.Dtos;
using Booking_Hotel.Interfaces;
using Booking_Hotel.Models;
using Booking_Hotel.Services.Vnpay;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Booking_Hotel.Helpers;
using Booking_Hotel.Models.Vnpay;

namespace Booking_Hotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingsController : ControllerBase
    {
        private readonly IEmailService _emailService;
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;
        private readonly IVnpayServices _vnPayService;

        public BookingsController(IUnitOfWork uow, IMapper mapper, IVnpayServices vnPayService,
            IEmailService emailService)
        {
            _uow = uow;
            _mapper = mapper;
            _vnPayService = vnPayService;
            _emailService = emailService;
        }

        [HttpGet]
        public async Task<IActionResult> GetBookings()
        {
            var bookings = await _uow.BookingRepository.GetBookings();
            var bookingDtos = _mapper.Map<IEnumerable<BookingDto>>(bookings);
            return Ok(bookingDtos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBooking(string id)
        {
            var booking = await _uow.BookingRepository.GetBooking(id);
            if (booking == null)
            {
                return NotFound();
            }

            var bookingDto = _mapper.Map<BookingDto>(booking);
            return Ok(bookingDto);
        }

       private async Task SendEmail(string bookingId)
        {
            var booking = await _uow.BookingRepository.GetBooking(bookingId);
            if (booking == null)
            {
                throw new ArgumentException("Booking not found.");
            }

            var mailRequest = new Mailrequest
            {
                ToEmail = booking.Email,
                Subject = "Xác nhận đơn đặt phòng của bạn",
                Body = GenerateEmailBody(booking)
            };

            await _emailService.SendEmailAsync(mailRequest);
        }

        private string GenerateEmailBody(Booking booking)
        {
            string hotelName = "Chuỗi khách sạn LH"; 
            string formattedBookingDateIn = booking.CheckInDate.ToString("dd/MM/yyyy");
            string formattedBookingDateOut = booking.CheckOutDate.ToString("dd/MM/yyyy");
            string formattedPaymentAmount = String.Format("{0:C}", booking.MoneyReceived);

            string body = $@"
        <div style='font-family: Arial, sans-serif; color: #333;'>
            <p style='font-size: 16px;'>Kính gửi <strong>{booking.UserName}</strong>,</p>
            <p style='font-size: 16px;'>Cảm ơn bạn đã chọn ở lại với chúng tôi tại <strong>{hotelName}</strong>! Chúng tôi rất vui khi có bạn là khách hàng của chúng tôi từ <strong>{formattedBookingDateIn} đến ngày {formattedBookingDateOut}</strong>.</p>
            <p style='font-size: 16px;'>Xin lưu ý mã đặt phòng của bạn là <strong>{booking.Id}</strong> và khoản thanh toán đã được nhận với số tiền là <strong>{formattedPaymentAmount}</strong>.</p>
            <p style='font-size: 16px;'>Nếu bạn yêu cầu bất kỳ tiện nghi hoặc dịch vụ bổ sung nào, chúng tôi sẽ sẵn lòng cung cấp những tiện nghi hoặc dịch vụ đó cho bạn trong thời gian lưu trú.</p>
            <p style='font-size: 16px;'>Cảm ơn bạn một lần nữa vì đã chọn chúng tôi và chúng tôi mong được có bạn là khách của chúng tôi.</p>
            <p style='font-size: 16px;'>Trân trọng,</p>
            <p style='font-size: 16px;'><strong>{hotelName}</strong></p>
        </div>";

            return body;
        }


        
     

        [HttpPost]
        public async Task<IActionResult> CreateBooking(BookingDto bookingDto)
        {
            var booking = _mapper.Map<Booking>(bookingDto);
            if (string.IsNullOrEmpty(bookingDto.UserID))
            {
                booking.UserID = null;
            }
            await _uow.BookingRepository.CreateBooking(booking);
            var result = await _uow.SaveAsync();
            if (!result)
            {
                return BadRequest("Could not save the booking.");
            }
            return Ok();
        }
        
      
        [HttpGet]
        [Route("confirmvnpay")]
        public async Task<IActionResult> PaymentCallback([FromQuery] VnpayResponse model)
        {
            try
            {
                // Extract necessary fields from model
                string orderId = model.vnp_TxnRef;
                string vnpayResponseCode = model.vnp_ResponseCode;

                // Find the booking based on orderId
                var booking = await _uow.BookingRepository.GetBooking(orderId);

                if (booking == null)
                {
                    return NotFound();
                }
                if (vnpayResponseCode == "00")
                {
                    booking.StatusPayment = "Đã thanh toán";
                    await _uow.SaveAsync();
                    await SendEmail(booking.Id);
                    string redirectUrl =$"http://localhost:4200/page/success?id={booking.Id}&name={booking.CustomerName}&email={booking.Email}&amount={booking.TotalPrice}&status=success";
                    
                  return Redirect(redirectUrl);
                }
                else
                { 
                    booking.Status= "Đã hủy";
                    booking.StatusPayment = "Thanh toán thất bại";
                    await _uow.SaveAsync();
                    await _uow.BookingRepository.DeleteBooking(booking.Id);
                    string redirectUrl =$"http://localhost:4200/page/success?id={booking.Id}&name={booking.UserName}&email={booking.Email}&amount={booking.TotalPrice}&status=failed";
                    return Redirect(redirectUrl);
                }
            }
            catch (Exception ex)
            {
                string redirectUrl =$"http://localhost:4200/page/success?status=failed";
                return Redirect(redirectUrl);
            }
        }
        
        
        
        
        
        
        
        [HttpPost]
        [Route("vnpay-payment")]
        public async Task<IActionResult> CreatePaymentVnpay( [FromBody] BookingDto bookingDTO)
        {
      
            var userExists = await _uow.UserRepository.FindByEmailAsync(bookingDTO.Email);
       
            var Booking = new Booking
            {
                
                UserName = bookingDTO.UserName ,
                Email = bookingDTO.Email,
                PhoneNumber = bookingDTO.PhoneNumber,
                Note = bookingDTO.Note ?? string.Empty,
                NumberPeople = bookingDTO.NumberPeople,
                CreatedAt = DateTime.Now,
                BookedRooms = bookingDTO.BookedRooms,
                Status = bookingDTO.Status,
                CheckInDate = bookingDTO.CheckInDate,
                CheckOutDate = bookingDTO.CheckOutDate,
                TotalPrice = bookingDTO.TotalPrice,
                couponCode = bookingDTO.couponCode,
                discount = bookingDTO.discount,
                RoomId = bookingDTO.RoomId,
                Commission = (bookingDTO.discount) * (bookingDTO.TotalPrice) / 100,
                MoneyReceived = (bookingDTO.TotalPrice) - ((bookingDTO.discount) * (bookingDTO.TotalPrice) / 100),
                UserID = userExists != null ? (string?)userExists.Id : null,
                HotelId = bookingDTO.HotelId,
                StatusPayment = string.IsNullOrEmpty(bookingDTO.StatusPayment) ? "Pending" : bookingDTO.StatusPayment,
                PaymentId = bookingDTO.PaymentId,
            };

            // Create the Booking record in the database
            await _uow.BookingRepository.CreateBooking(Booking);
            var result = await _uow.SaveAsync();
            if (!result)
            {
                return BadRequest("Could not save the booking.");
            }
      

            var response = _vnPayService.CreatePaymentUrl(Booking, HttpContext);
    
            return Ok(new { url = response });
        }
      

        [HttpPut("{id}")]
       
        public async Task<IActionResult> UpdateBooking(string id, BookingDto bookingDto)
        {
            var booking = _mapper.Map<Booking>(bookingDto);
            if (id != booking.Id)
            {
                return BadRequest();
            }

            return await _uow.BookingRepository.UpdateBooking(booking);
        }

        [HttpDelete("{id}")]
   
        public async Task<IActionResult> DeleteBooking(string id)
        {
            await _uow.BookingRepository.DeleteBooking(id);
            var result = await _uow.SaveAsync();
            if (!result)
            {
                return BadRequest("Could not delete the booking.");
            }
            return Ok();
        }
        
        [HttpGet]
        [Route("search")]
        public async Task<IActionResult> SearchBookings(string searchTerm)
        {
            var bookings = await _uow.BookingRepository.SearchBookings(searchTerm);
            return Ok(bookings);
        }

        [HttpGet]
        [Route("total")]
        public async Task<IActionResult> GetTotalBookings()
        {
            var totalBookings = await _uow.BookingRepository.GetTotalBookings();
            return Ok(totalBookings);
        }

        [HttpGet]
        [Route("status/{status}")]
        public async Task<IActionResult> GetBookingsByStatus(string status)
        {
            var bookingsByStatus = await _uow.BookingRepository.GetBookingsByStatus(status);
            return Ok(bookingsByStatus);
        }
    }
    
    
    

    
}
