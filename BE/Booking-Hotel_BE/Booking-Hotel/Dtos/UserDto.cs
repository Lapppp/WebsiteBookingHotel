﻿namespace Booking_Hotel.Dtos
{
    public class UserDto
    {
        public string? Id { get; set; }

        public string UserName { get; set; }

        public string? Name { get; set; }

        public string? Password { get; set; }

        public string? ConfirmPassword { get; set; }

        public string? Image { get; set; }

        public string Email { get; set; }

        public string? Phone { get; set; }

        public bool? Status { get; set; }
    }
}
