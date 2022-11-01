using System;

namespace AppConstant
{
    public class AppConstant
    {
        public const string Endpoint = "http://192.168.1.14:8888";
        //
        public const string APIThongBao = "/odata/ThongBaoChung";
        public const string APINhanVien = "/odata/S_NhanVien";
        public const string APIUser = "/odata/S_Users";
        public const string APIVanBan = "/odata/S_VanBan";
        public const string APIHoSo = "/odata/S_HoSo";
        public const string APILog = "/odata/NhatKies";
        public const string APIGetImage = "/fileuploads/download?key=";
        public const string APIInsertOrUpdateNhanVien = "api/nhanvien/insertorupdatenhanvien";
        public const string APIDeleteNhanVien = "api/nhankhau/deletenhanvien";
        public const string APIUploadImage = "api/img";
        public const string APIUpdateNhanVienAvatar = "api/nhanvien/updateavatar";
    }
}
