using Common.Common;
using DocumentManagement.Models.DTO;
using Refit;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using XamMobile.Constants;
using XamMobile.Models;

namespace XamMobile.Services.Interfaces
{
    public interface IUserService
    {
        [Post(AppConstant.UserApi + "/UserGetSearchWithPaging")]
        Task<ReturnResult<User>> UserGetSearchWithPaging([Body] BaseCondition<User> condition);

        [Get(AppConstant.UserApi + "/{id}")]
        Task<ReturnResult<User>> GetUserByID(int id);

        [Post(AppConstant.UserApi + "/CreateUser")]
        Task<ReturnResult<User>> CreateUser([Body] User user);

        [Post(AppConstant.UserApi + "/UpdateUser")]
        Task<ReturnResult<User>> UpdateUser([Body] User user);

        [Post(AppConstant.UserApi + "/DeleteUser")]
        Task<ReturnResult<User>> DeleteUser([Query] int id);

        [Get(AppConstant.UserApi + "/GetAllRole")]
        Task<ReturnResult<RoleDTO>> GetAllRole();
    }
}
