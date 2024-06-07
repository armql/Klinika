using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Klinika.Server.Models.DTO.Developer;

public class Metrics
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    [BsonElement("_id")]
    public string? Id { get; set; }

    public int Value { get; set; } = 0;
    public DateTime creationDate { get; set; }

    public Metrics()
    {
        creationDate = DateTime.UtcNow;
    }
}