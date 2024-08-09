using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Routing.Constraints;
using Microsoft.Identity.Client;

namespace Booking_Hotel.Models
{
    public class InvoiceDetail
    {
        public int Id { get; set; }

        public double UnitPrice { get; set; }

        public DateTime ServiceDate { get; set; }

        [StringLength(999)]
        public string? Description { get; set; }

        public double Amount { get; set; }

        public int Quantity { get; set; }

        public double? Discount { get; set; }

        public string InvoiceId { get; set; }

        [JsonIgnore]
        [ForeignKey("InvoiceId")]
        public Invoice? Invoice { get; set; }
    }
}