using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace XamMobile.EntityModels
{
    public class VanBanEntity
    {
        [JsonProperty("VanBanID")]
        public int VanBanID { get; set; }
        [JsonProperty("SoVanBan")]
        public string SoVanBan { get; set; }
    }
}
