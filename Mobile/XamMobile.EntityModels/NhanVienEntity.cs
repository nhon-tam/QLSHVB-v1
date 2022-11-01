using Newtonsoft.Json;
using System;
using System.ComponentModel;

namespace XamMobile.EntityModels
{
    public class NhanVienEntity : INotifyPropertyChanged
    {
        public event PropertyChangedEventHandler PropertyChanged;
        protected virtual void OnPropertyChanged(string propertyName)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
        public string GioiTinhStr
        {
            get
            {
                return GioiTinh == true ? "Nam" : "Nữ";
            }
        }
        [JsonProperty("NhanVienID")]
        public int NhanVienID { get; set; }

        private string _tenNhanVien;
        [JsonProperty("TenNhanVien")]
        public string TenNhanVien
        {
            get
            {
                return _tenNhanVien;
            }
            set
            {
                _tenNhanVien = value;
                OnPropertyChanged(nameof(TenNhanVien));
            }
        }
        private string _anhDaiDien;
        [JsonProperty("AnhDaiDien")]
        public string AnhDaiDien
        {
            get
            {
                return _anhDaiDien;
            }
            set
            {
                _anhDaiDien = value;
                OnPropertyChanged(nameof(AnhDaiDien));
            }
        }

        [JsonProperty("UserName")]
        public string UserName { get; set; }
        private Nullable<System.DateTime> _ngaySinh;
        [JsonProperty("NgaySinh")]
        public Nullable<System.DateTime> NgaySinh {
            get
            {
                return _ngaySinh;
            }
            set
            {
                _ngaySinh = value;
                OnPropertyChanged(nameof(NgaySinh));
            }
        }
        private Nullable<bool> _gioiTinh;
        [JsonProperty("GioiTinh")]
        public Nullable<bool> GioiTinh
        {
            get
            {
                return _gioiTinh;
            }
            set
            {
                _gioiTinh = value;
                OnPropertyChanged(nameof(GioiTinh));
            }
        }
        private string _nguyenQuan;
        [JsonProperty("NguyenQuan")]
        public string NguyenQuan
        {
            get
            {
                return _nguyenQuan;
            }
            set
            {
                _nguyenQuan = value;
                OnPropertyChanged(nameof(NguyenQuan));
            }
        }
        private string _soCMT;
        [JsonProperty("SoCMT")]
        public string SoCMT {
            get
            {
                return _soCMT;
            }
            set
            {
                _soCMT = value;
                OnPropertyChanged(nameof(SoCMT));
            }
        }
        private Nullable<System.DateTime> _ngayCap;
        [JsonProperty("NgayCap")]
        public Nullable<System.DateTime> NgayCap {
            get
            {
                return _ngayCap;
            }
            set
            {
                _ngayCap = value;
                OnPropertyChanged(nameof(NgayCap));
            }
        }
        private string _noiCap;
        [JsonProperty("NoiCap")]
        public string NoiCap {
            get
            {
                return _noiCap;
            }
            set
            {
                _noiCap = value;
                OnPropertyChanged(nameof(NoiCap));
            }
        }

        [JsonProperty("UserID")]
        public Nullable<int> UserID { get; set; }
        public string _soDienThoai;
        [JsonProperty("SoDienThoai")]
        public string SoDienThoai {
            get
            {
                return _soDienThoai;
            }
            set
            {
                _soDienThoai = value;
                OnPropertyChanged(nameof(SoDienThoai));
            }
        }
        private string _email;
        [JsonProperty("Email")]
        public string Email {
            get
            {
                return _email;
            }
            set
            {
                _email = value;
                OnPropertyChanged(nameof(Email));
            }
        }

        public string NgaySinhFormat
        {
            get
            {
                return NgaySinh?.ToString("dd/MM/yyyy");
            }

        }

        public string NgayCapFormat
        {
            get
            {
                return NgayCap?.ToString("dd/MM/yyyy");
            }
        }
    }
}
