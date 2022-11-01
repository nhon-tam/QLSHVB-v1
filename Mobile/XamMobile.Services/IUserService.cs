using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using XamMobile.EntityModels;
using XamMobile.Services.Models;

namespace XamMobile.Services
{
    public interface IUserService
    {
        Task<MessageResponse> Login(string userName, string passWord);
        Task<bool> UpdateNVAvatar(int nhanVienId, string imageName);
        Task<List<NhanVienEntity>> GetNhanVien(int userId);
        Task<NhanVienEntity> SaveNhanVien(NhanVienEntity model);
        Task<bool> DeleteNhanVien(NhanVienEntity model);
        Task<UserEntity> GetUserById(int useId);
        Task<List<UserEntity>> GetUsers();
        Task<List<NhanVienEntity>> GetNhanViens();
    }
}
