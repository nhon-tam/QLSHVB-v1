//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace G02Apis.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class S_NhanVien
    {
        public int NhanVienID { get; set; }
        public string TenNhanVien { get; set; }
        public Nullable<System.DateTime> NgaySinh { get; set; }
        public string Email { get; set; }
        public string SoCMT { get; set; }
        public Nullable<int> UserID { get; set; }
        public Nullable<bool> GioiTinh { get; set; }
        public Nullable<System.DateTime> NgayCap { get; set; }
        public string NoiCap { get; set; }
        public string SoDienThoai { get; set; }
        public string AnhDaiDien { get; set; }
        public string NguyenQuan { get; set; }
    
        public virtual S_Users S_Users { get; set; }
    }
}
