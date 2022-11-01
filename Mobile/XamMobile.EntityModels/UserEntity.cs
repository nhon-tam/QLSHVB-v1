using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace XamMobile.EntityModels
{
    public class UserEntity
    {
        [JsonProperty("UserID")]
        public int UserID { get; set; }
        [JsonProperty("UserName")]
        public string UserName { get; set; }
    }
}
