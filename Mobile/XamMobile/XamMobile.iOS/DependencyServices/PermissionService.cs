using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Foundation;
using UIKit;
using XamMobile.DependencyServices;
using XamMobile.iOS.DependencyServices;

[assembly: Xamarin.Forms.Dependency(typeof(PermissionService))]
namespace XamMobile.iOS.DependencyServices
{
    public class PermissionService : IPermissionService
    {
        public Task<bool> RequestExternalPermssion()
        {
            return Task.FromResult(true);
        }
    }
}