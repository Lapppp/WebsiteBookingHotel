using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using Booking_Hotel.Models;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace Booking_Hotel.Interfaces
{
    public interface IInvoiceDetailRepository
    {
        Task CreateInvoiceDetail(InvoiceDetail invoiceDetail);

        Task<bool> InvoiceDetailExist(int id);

        Task<IEnumerable<InvoiceDetail>> GetInvoiceDetails(string invoiceId);

        Task<InvoiceDetail> GetInvoiceDetail(int id);

        Task<IActionResult> UpdateInvoiceDetail(InvoiceDetail invoiceDetail);
    }
}