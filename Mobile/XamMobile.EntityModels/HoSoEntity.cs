using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace XamMobile.EntityModels
{
    public class HoSoEntity
    {
        [JsonProperty("HoSoID")]
        public int HoSoID { get; set; }
        [JsonProperty("SoHoSo")]
        public string SoHoSo { get; set; }
        [JsonProperty("MaHoSo")]
        public string MaHoSo { get; set; }
        [JsonProperty("Status")]
        public Nullable<byte> Status { get; set; }
        [JsonProperty("ThoiGianBatDau")]
        public Nullable<System.DateTime> ThoiGianBatDau { get; set; }

        [JsonProperty("ThoiGianKetThuc")]
        public Nullable<System.DateTime> ThoiGianKetThuc { get; set; }

        [JsonProperty("ThoiHanBaoQuan")]
        public string ThoiHanBaoQuan { get; set; }

        [JsonProperty("TongSoVanBan")]
        public int TongSoVanBan { get; set; }

        [JsonProperty("KyHieuThongTin")]
        public string KyHieuThongTin { get; set; }

        [JsonProperty("TuKhoa")]
        public string TuKhoa { get; set; }
        public string TrangThai
        {
            get
            {
                return Status == 1 ? "Đã hoàn thành nhập liệu" : "Chưa hoàn thành nhập liệu";
            }

        }
        public string CustomNameProfileCode
        {
            get
            {
                return $"Mã hồ sơ: {MaHoSo}";
            }
        }

        public string CustomNameTongSoVanBan
        {
            get
            {
                return $"Tổng số văn bản: {TongSoVanBan}";
            }
        }
        public string CustomNameThoiHanBaoQuan
        {
            get
            {
                return $"Thời hạn bảo quản: {ThoiHanBaoQuan}";
            }
        }
        public string CustomNameKyHieuThongTin
        {
            get
            {
                return $"Ký hiệu thông tin: {KyHieuThongTin}";
            }
        }
        public string CustomNameTuKhoa
        {
            get
            {
                return $"Từ khóa: {TuKhoa}";
            }
        }
        public string CustomNameProfileNumber
        {
            get
            {
                return $"Số hồ sơ: {SoHoSo}";
            }
        }

        public string ThoiGianBatDauFormat
        {
            get
            {
                return $"Thời gian bắt đầu: {ThoiGianBatDau?.ToString("dd/MM/yyyy")}";
            }
        }

        public string ThoiGianKetThucFormat
        {
            get
            {
                return $"Thời gian kết thúc: {ThoiGianKetThuc?.ToString("dd/MM/yyyy")}";
            }
        }

        public string TextColor
        {
            get
            {
                return Status == 1 ? "Green" : "Red";
            }
        }
    }
}
