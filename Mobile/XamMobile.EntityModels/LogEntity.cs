using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace XamMobile.EntityModels
{
    public class LogEntity
    {
        [JsonProperty("NhatKyId")]
        public int NhatKyId { get; set; }
        [JsonProperty("VanBanId")]
        public Nullable<int> VanBanId { get; set; }
        [JsonProperty("SoVanBan")]
        public string SoVanBan { get; set; }
        [JsonProperty("Action")]
        public string Action { get; set; }
        [JsonProperty("CreatedDate")]
        public Nullable<System.DateTime> CreatedDate { get; set; }

        [JsonProperty("UpdatedDate")]
        public Nullable<System.DateTime> UpdatedDate { get; set; }

        [JsonProperty("CreatedBy")]
        public Nullable<int> CreatedBy { get; set; }

        [JsonProperty("UpdatedBy")]
        public Nullable<int> UpdatedBy { get; set; }

        [JsonProperty("TenNguoiTao")]
        public string TenNguoiTao { get; set; }
        public string CreatedDateFormat
        {
            get
            {
                return CreatedDate?.ToString("dd/MM/yyyy HH:mm:ss");
            }
        }

        public string CustomNameDocumentNumber
        {
            get
            {
                return $"Số văn bản: {SoVanBan}"; 
            }
        }
    }
}
