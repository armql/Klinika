using Klinika.Server.Models;

namespace Klinika.Server.Repositories;

public interface IImageRepository
{
    Task<IEnumerable<Image>> GetImagesAsync();
    Task<Image> GetImageByIdAsync(int id);
    Task<Image> AddImageAsync(Image image);
    Task DeleteImageAsync(int id);
}