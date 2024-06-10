using Klinika.Server.Configurations;
using Klinika.Server.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace Klinika.Server.Services
{
    public class ReportServices
    {
        private readonly IMongoCollection<Fee> _feeCollection;

        public ReportServices(IOptions<MongoSettings> clientSettings, IConfiguration configuration)
        {
            var client = new MongoClient(configuration["MongoDatabase:ConnectionString"]);
            var databaseName = configuration["MongoDatabase:DatabaseName"];
            var mongoDb = client.GetDatabase(databaseName);
            _feeCollection = mongoDb.GetCollection<Fee>(configuration["MongoDatabase:Report"]);
        }

        public async Task<List<Fee>> GetAllFeesAsync()
        {
            return await _feeCollection.Find(fee => true).ToListAsync();
        }
        
        public async Task<Fee> GetFeeAsync(ObjectId id)
        {
            return await _feeCollection.Find(u => u._id == id).FirstOrDefaultAsync();
        }

        public async Task UpdateFeeAsync(ObjectId id, Fee fee)
        {
            await _feeCollection.ReplaceOneAsync(u => u._id == id, fee);
        }
    }
}