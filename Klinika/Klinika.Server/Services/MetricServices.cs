using Klinika.Server.Configurations;
using Klinika.Server.Models.DTO.Developer;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

// MongoServices.cs
namespace Klinika.Server.Services;

public class MetricServices
{
    private readonly IMongoCollection<Metrics> _metricsCollection;
    
    public MetricServices(IOptions<MongoSettings> clientSettings)
    {
        var client = new MongoClient(clientSettings.Value.ConnectionString);
        var mongoDb = client.GetDatabase(clientSettings.Value.Database);
        _metricsCollection = mongoDb.GetCollection<Metrics>(clientSettings.Value.Metrics);
    }
        
    public async Task<List<Metrics>> GetAllAsync()
    {
        return await _metricsCollection.Find(_ => true).ToListAsync();
    }

    public async Task<Metrics> GetAsync(string id)
    {
        return await _metricsCollection.Find(m => m.Id == id).FirstOrDefaultAsync();
    }

    public async Task<Metrics> createAsync(Metrics metric)
    {
        await _metricsCollection.InsertOneAsync(metric);
        return metric;
    }

    public async Task updateAsync(string id, Metrics metric)
    {
        await _metricsCollection.ReplaceOneAsync(m => m.Id == id, metric);
    }

    public async Task deleteAsync(string id)
    {
        await _metricsCollection.DeleteOneAsync(m => m.Id == id);
    }
}