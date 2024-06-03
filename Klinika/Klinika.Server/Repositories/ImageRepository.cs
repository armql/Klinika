using Klinika.Server.Models;
using Klinika.Server.Models.Data;
using Microsoft.EntityFrameworkCore;

namespace Klinika.Server.Repositories;

public class ImageRepository : IImageRepository
{
    private readonly ApplicationDbContext _dbContext;

    public ImageRepository(ApplicationDbContext context)
    {
        _dbContext = context;
    }

    public async Task<IEnumerable<Image>> GetImagesAsync()
    {
        return await _dbContext.Images.ToListAsync();
    }

    public async Task<Image> GetImageByIdAsync(int id)
    {
        return await _dbContext.Images.FindAsync(id);
    }

    public async Task<Image> AddImageAsync(Image image)
    {
        _dbContext.Images.Add(image);
        await _dbContext.SaveChangesAsync();
        return image;
    }

    public async Task DeleteImageAsync(int id)
    {
        var image = await _dbContext.Images.FindAsync(id);
        if (image != null)
        {
            _dbContext.Images.Remove(image);
            await _dbContext.SaveChangesAsync();
        }
    }
}