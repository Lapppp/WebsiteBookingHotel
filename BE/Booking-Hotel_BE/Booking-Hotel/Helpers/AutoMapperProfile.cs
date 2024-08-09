using AutoMapper;
using Booking_Hotel.Dtos;
using Booking_Hotel.Models;
using CloudinaryDotNet.Core;
using System.Drawing;

namespace Booking_Hotel.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserDto>().ForMember(dest => dest.Phone, opt => opt.MapFrom(src => src.PhoneNumber))
            .ReverseMap()
            .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.Phone));
            CreateMap<Room, RoomDto>().ReverseMap();
            CreateMap<Hotel, HotelDto>().ReverseMap();
            CreateMap<Booking, BookingDto>().ReverseMap();
        }
    }
}
