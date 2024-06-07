namespace Klinika.Server.Configurations;

public class MongoSettings
{
    public string ConnectionString { get; set; } = null!;
    public string Database { get; set; } = null!;
    public string Specialized { get; set; } = null!;
    public string Reservations { get; set; } = null!;
    public string Patients { get; set; } = null!;
    public string Registered { get; set; } = null!;
    public string Fees { get; set; } = null!;
    public string Report { get; set; } = null!;
}