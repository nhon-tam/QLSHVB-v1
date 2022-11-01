using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace XamMobile.DependencyServices
{
    public interface IPermissionService
    {
        Task<bool> RequestExternalPermssion();
    }
}
