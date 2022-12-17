using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Acr.UserDialogs;
using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using Plugin.Permissions;
using Plugin.Permissions.Abstractions;
using XamMobile.DependencyServices;
using XamMobile.Droid.DependencyServices;

[assembly: Xamarin.Forms.Dependency(typeof(PermissionService))]
namespace XamMobile.Droid.DependencyServices
{
    public class PermissionService : IPermissionService
    {
        public async Task<bool> RequestExternalPermssion()
        {
            try
            {
                var status = await CrossPermissions.Current.CheckPermissionStatusAsync(Permission.Storage);
                if (status != PermissionStatus.Granted)
                {
                    if (await CrossPermissions.Current.ShouldShowRequestPermissionRationaleAsync(Permission.Storage))
                    {
                        await UserDialogs.Instance.AlertAsync("Need Storage permission.").ConfigureAwait(false);
                    }

                    var results = await CrossPermissions.Current.RequestPermissionsAsync(new[] { (Permission.Storage) });
                    status = results[(Permission.Storage)];
                }

                if (status == PermissionStatus.Granted)
                {
                    return true;
                }
                return false;
            }
            catch(Exception ex)
            {
                await UserDialogs.Instance.AlertAsync("Something went wrong: " + ex.Message).ConfigureAwait(false);

                return false;
            }
        }
    }
}