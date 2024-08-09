using Booking_Hotel.Models;
using Booking_Hotel.Models.Vnpay;

namespace Booking_Hotel.Services.Vnpay;

public class VnpayServices : IVnpayServices
{
    private readonly IConfiguration _configuration;

    public VnpayServices( IConfiguration configuration)
    {
        _configuration = configuration;
    }
    /*public string CreatePaymentUrl(Booking model, HttpContext context)
    {
        var timeZoneById = TimeZoneInfo.FindSystemTimeZoneById(_configuration["TimeZoneId"]);
        var timeNow = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, timeZoneById);
        //var tick = DateTime.Now.Ticks.ToString();
        var pay = new VnPayLibrary();
        

        pay.AddRequestData("vnp_Version", _configuration["Vnpay:Version"]);
        pay.AddRequestData("vnp_Command", _configuration["Vnpay:Command"]);
        pay.AddRequestData("vnp_TmnCode", _configuration["Vnpay:TmnCode"]);
        pay.AddRequestData("vnp_Amount", ((float)model.TotalPrice * 100).ToString());
        pay.AddRequestData("vnp_CreateDate", timeNow.ToString("yyyyMMddHHmmss"));
        pay.AddRequestData("vnp_CurrCode", _configuration["Vnpay:CurrCode"]);
        pay.AddRequestData("vnp_IpAddr", pay.GetIpAddress(context));
        pay.AddRequestData("vnp_Locale", _configuration["Vnpay:Locale"]);
        pay.AddRequestData("vnp_OrderInfo", $"{model.UserName} thanh toán Booking {model.Id}");
        pay.AddRequestData("vnp_OrderType", "170003");
        pay.AddRequestData("vnp_ReturnUrl", _configuration["Vnpay:ReturnUrl"]);
        pay.AddRequestData("vnp_TxnRef",$"{model.Id}");

        var paymentUrl =pay.CreateRequestUrl(_configuration["Vnpay:BaseUrl"], _configuration["Vnpay:HashSecret"]);

        return paymentUrl;
    }*/
    /*
    public string CreatePaymentUrl(Booking model, HttpContext context)
    {
        var timeZoneById = TimeZoneInfo.FindSystemTimeZoneById(_configuration["TimeZoneId"]);
        var timeNow = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, timeZoneById);

        var pay = new VnPayLibrary();

        pay.AddRequestData("vnp_Version", _configuration["Vnpay:Version"]);
        pay.AddRequestData("vnp_Command", _configuration["Vnpay:Command"]);
        pay.AddRequestData("vnp_TmnCode", _configuration["Vnpay:TmnCode"]);
        pay.AddRequestData("vnp_Amount", ((float)model.TotalPrice * 100).ToString());
        pay.AddRequestData("vnp_CreateDate", timeNow.ToString("yyyyMMddHHmmss"));
        pay.AddRequestData("vnp_CurrCode", _configuration["Vnpay:CurrCode"]);
        pay.AddRequestData("vnp_IpAddr", pay.GetIpAddress(context));
        pay.AddRequestData("vnp_Locale", _configuration["Vnpay:Locale"]);
        pay.AddRequestData("vnp_OrderInfo", $"{model.UserName} thanh toán Booking {model.Id}");
        pay.AddRequestData("vnp_OrderType", "170003");
        pay.AddRequestData("vnp_ReturnUrl", _configuration["Vnpay:ReturnUrl"]);
        pay.AddRequestData("vnp_TxnRef", model.Id);

        var paymentUrl = pay.CreateRequestUrl(_configuration["Vnpay:BaseUrl"], _configuration["Vnpay:HashSecret"]);

        return paymentUrl;
    }
    */
    public string CreatePaymentUrl(Booking model, HttpContext context)
    {
        var timeZoneById = TimeZoneInfo.FindSystemTimeZoneById(_configuration["TimeZoneId"]);
        var timeNow = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, timeZoneById);

        var pay = new VnPayLibrary();

        // Add request data
        pay.AddRequestData("vnp_Version", _configuration["Vnpay:Version"]);
        pay.AddRequestData("vnp_Command", _configuration["Vnpay:Command"]);
        pay.AddRequestData("vnp_TmnCode", _configuration["Vnpay:TmnCode"]);
        pay.AddRequestData("vnp_Amount", ((decimal)(model.MoneyReceived*100)).ToString()); 
        pay.AddRequestData("vnp_CreateDate", timeNow.ToString("yyyyMMddHHmmss"));
        pay.AddRequestData("vnp_CurrCode", _configuration["Vnpay:CurrCode"]);
        pay.AddRequestData("vnp_IpAddr", pay.GetIpAddress(context));
        pay.AddRequestData("vnp_Locale", _configuration["Vnpay:Locale"]);
        pay.AddRequestData("vnp_OrderInfo", $"{model.UserName} thanh toán Booking {model.Id}");
        pay.AddRequestData("vnp_OrderType", "170003");
        pay.AddRequestData("vnp_ReturnUrl", _configuration["Vnpay:ReturnUrl"]);
        pay.AddRequestData("vnp_TxnRef", model.Id.ToString()); // Ensure TxnRef is string

        // Generate request URL
        var paymentUrl = pay.CreateRequestUrl(_configuration["Vnpay:BaseUrl"], _configuration["Vnpay:HashSecret"]);

        // Log request data for debugging
        foreach (var data in pay.GetRequestData())
        {
            Console.WriteLine($"{data.Key}: {data.Value}");
        }

        Console.WriteLine($"Generated Payment URL: {paymentUrl}");

        return paymentUrl;
    }


    public PaymentResponseModel PaymentExecute(IQueryCollection collections)
    {
        var pay = new VnPayLibrary();
        var response = pay.GetFullResponseData(collections, _configuration["Vnpay:HashSecret"]);

        return response;
    }
}