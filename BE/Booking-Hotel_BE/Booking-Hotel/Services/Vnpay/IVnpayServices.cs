using Booking_Hotel.Models;
using Booking_Hotel.Models.Vnpay;
using Stripe;

namespace Booking_Hotel.Services.Vnpay;

public interface IVnpayServices
{
    string CreatePaymentUrl(Booking model, HttpContext context);
    PaymentResponseModel PaymentExecute(IQueryCollection collections);
    
}