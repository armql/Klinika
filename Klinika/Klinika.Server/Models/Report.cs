using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Klinika.Server.Models;

public class Report
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public ObjectId _id { get; set; }

    [BsonElement("note")]
    public string Note { get; set; }

    [BsonElement("userId")]
    public string UserId { get; set; }

    [BsonElement("primaryCareId")]
    public string PrimaryCareId { get; set; }
}

public class UserReport
{
    public string Id { get; set; }
    public string Note { get; set; }
    public string UserFullName { get; set; }
    public string PrimaryCareFullName { get; set; }
}

public class PrescribeRequest
{
    public string UserId { get; set; }
    public string SpecializationName { get; set; }
    public string Note { get; set; }
    public string PrimaryCareId { get; set; }
}