using Klinika.Server.Configurations;
using Klinika.Server.Models.DTO.Developer;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

// MongoServices.cs
namespace Klinika.Server.Services;

public class PatientsServices
{
    private readonly IMongoCollection<Metrics> _metricsCollection;
    
    public PatientsServices(IOptions<MongoSettings> clientSettings)
    {
        var client = new MongoClient(clientSettings.Value.ConnectionString);
        var mongoDb = client.GetDatabase(clientSettings.Value.Database);
        _metricsCollection = mongoDb.GetCollection<Metrics>(clientSettings.Value.Patients);
    }
        
    public async Task<List<Metrics>> GetAllAsync()
    {
        return await _metricsCollection.Find(_ => true).ToListAsync();
    }

    public async Task<Metrics> GetAsync(string id)
    {
        return await _metricsCollection.Find(m => m.Id == id).FirstOrDefaultAsync();
    }

    public async Task<Metrics> CreateAsync(Metrics metric)
    {
        var existingMetric = await _metricsCollection.Find(m => m.Value == metric.Value).FirstOrDefaultAsync();

        if (existingMetric != null)
        {
            return null;
        }

        await _metricsCollection.InsertOneAsync(metric);
        return metric;
    }


    // public async Task updateAsync(string id, Metrics metric)
    // {
    //     await _metricsCollection.ReplaceOneAsync(m => m.Id == id, metric);
    // }
    //
    // public async Task deleteAsync(string id)
    // {
    //     await _metricsCollection.DeleteOneAsync(m => m.Id == id);
    // }
}