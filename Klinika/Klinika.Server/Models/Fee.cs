using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Klinika.Server.Models;

public class Fee
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public ObjectId _id { get; set; }

    [BsonElement("specializations")]
    public List<TempSp> Specializations { get; set; }
}

public class TempSp
{
    [BsonElement("name")]
    public string name { get; set; }

    [BsonElement("feeReleased")]
    public List<string> feeReleased { get; set; }
}

public class PurchaseProductRequest
{
    public string userId { get; set; }
    public string specializationName { get; set; }
}