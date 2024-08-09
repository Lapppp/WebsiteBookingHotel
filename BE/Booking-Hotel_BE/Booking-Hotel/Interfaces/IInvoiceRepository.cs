using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Booking_Hotel.Models;
using Microsoft.AspNetCore.Mvc;

namespace Booking_Hotel.Interfaces
{
    public interface IInvoiceRepository
    {
        Task CreateInvoice(Invoice invoiceInvoice);

        Task<bool> InvoiceExist(string id);

        Task<IEnumerable<Invoice>> GetInvoices(string bookingId);

        Task<Invoice> GetInvoice(string id);
        
        Task<IEnumerable<Invoice>> SearchInvoices(string searchTerm);

        Task<Dictionary<string, double>> GetTotalInvoicedByMonth();
    }
}