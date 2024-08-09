using Booking_Hotel.Models;
using CloudinaryDotNet.Actions;

namespace Booking_Hotel.Interfaces
{
    public interface IPhotoService
    {
        Task<ImageUploadResult> UploadPhotoAsync(IFormFile photo);
        Task<DeletionResult> DeletePhotoAsync(string publicID);
    }
}
