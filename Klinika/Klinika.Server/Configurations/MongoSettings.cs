namespace Klinika.Server.Configurations;

public class MongoSettings
{
    public string ConnectionString { get; set; } = null!;
    public string Database { get; set; } = null!;
    public string Metrics { get; set; } = null!;
    public string Fees { get; set; } = null!;
}