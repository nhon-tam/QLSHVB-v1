using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Support.V4.Content;
using Android.Views;
using Android.Widget;
using XamMobile.DependencyServices;
using XamMobile.Droid.DependencyServices;

[assembly: Xamarin.Forms.Dependency(typeof(AndroidFileService))]
namespace XamMobile.Droid.DependencyServices
{
    public class AndroidFileService : IFileService
    {
        public Intent IntenOpenDoc { get; set; }
        public string GetDownloadFolder()
        {
            return System.IO.Path.Combine(Android.OS.Environment.ExternalStorageDirectory.AbsolutePath, Android.OS.Environment.DirectoryDownloads);
        }

//        public void SelectMultiFile(string data)
//        {
//            try
//            {
//                IntenOpenDoc = new Intent(Intent.ActionOpenDocument);
//                IntenOpenDoc.SetType("*/*");
//                IntenOpenDoc.PutExtra(Intent.ExtraAllowMultiple, true);
//                IntenOpenDoc.AddCategory(Intent.CategoryOpenable);
//                IntenOpenDoc.SetAction(Intent.ActionGetContent);
//                MainActivity.Instance.Intent.PutExtra("browser_key", data);
//                MainActivity.Instance.StartActivityForResult(IntenOpenDoc, MainActivity.PickMultipleFileId);
//            }
//#pragma warning disable CA1031 // Do not catch general exception types
//            catch (Exception ex)
//            {
//                Console.WriteLine(ex.ToString());
//                Toast.MakeText(MainActivity.Instance, "Error. Can not continue, try again.", ToastLength.Long).Show();
//            }
//#pragma warning restore CA1031 // Do not catch general exception types
//        }

        public void OpenFile(string filePath)
        {
            var bytes = File.ReadAllBytes(filePath);

            //Copy the private file's data to the EXTERNAL PUBLIC location
            string externalStorageState = global::Android.OS.Environment.ExternalStorageState;
            string application = "";

            string extension = System.IO.Path.GetExtension(filePath);

            switch (extension.ToLower())
            {
                case ".doc":
                case ".docx":
                    application = "application/msword";
                    break;
                case ".pdf":
                    application = "application/pdf";
                    break;
                case ".xls":
                case ".xlsx":
                    application = "application/vnd.ms-excel";
                    break;
                case ".jpg":
                case ".jpeg":
                case ".png":
                    application = "image/jpeg";
                    break;
                case ".heic":
                    application = "image/heic";
                    break;
                case ".heif":
                    application = "image/heif";
                    break;
                default:
                    application = "*/*";
                    break;
            }
            Java.IO.File file = new Java.IO.File(filePath);
            file.SetReadable(true);
            //Android.Net.Uri uri = Android.Net.Uri.Parse("file://" + filePath);
            Intent intent = new Intent(Intent.ActionView);
            Android.Net.Uri uri = null;
            Context context = MainActivity.Instance;
            if (Android.OS.Build.VERSION.SdkInt >= Android.OS.BuildVersionCodes.N)
            {
                uri = FileProvider.GetUriForFile(context, "com.companyname.appname.fileprovider", file);
            }
            else
            {
                uri = Android.Net.Uri.FromFile(file);
            }

            intent.SetDataAndType(uri, application);
            intent.SetFlags(ActivityFlags.ClearWhenTaskReset | ActivityFlags.NewTask | ActivityFlags.GrantReadUriPermission);
            try
            {
                context.StartActivity(intent);
            }
#pragma warning disable CA1031 // Do not catch general exception types
            catch (Exception)
            {
                Toast.MakeText(MainActivity.Instance, "No Application Available to View this file", ToastLength.Short).Show();
            }
#pragma warning restore CA1031 // Do not catch general exception types
        }
    }
}