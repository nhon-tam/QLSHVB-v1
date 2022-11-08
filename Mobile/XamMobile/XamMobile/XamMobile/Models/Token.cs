using System;

namespace XamMobile.Models
{
    public class Token
    {
        public string? JwtToken { get; set; }
        public DateTime? Expiration { get; set; }
    }
}
