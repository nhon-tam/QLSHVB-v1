using Refit;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using XamMobile.Constants;
using XamMobile.Models;

namespace XamMobile.Services.Interfaces
{
    public interface IAuthenticationService
    {
        [Post(AppConstant.LoginApi + "/Login")]
        Task<ReturnResult<User>> Login([Body] Account account);
    }
}
