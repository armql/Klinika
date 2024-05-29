using Newtonsoft.Json;

namespace Klinika.Server.Models;

public class TokenPayloadDTO
{
    [JsonProperty("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress")]
    public string EmailAddress { get; set; }

    [JsonProperty("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")]
    public string NameIdentifier { get; set; }

    [JsonProperty("JWTID")]
    public string JwtId { get; set; }

    [JsonProperty("http://schemas.microsoft.com/ws/2008/06/identity/claims/role")]
    public string Role { get; set; }

    [JsonProperty("exp")]
    public long Expiration { get; set; }

    [JsonProperty("iss")]
    public string Issuer { get; set; }

    [JsonProperty("aud")]
    public string Audience { get; set; }
}