using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Foundation;
using MobileCoreServices;
using UIKit;
using Xamarin.Forms;
using XamMobile.DependencyServices;
using XamMobile.iOS.DependencyServices;

[assembly: Xamarin.Forms.Dependency(typeof(iOSFileService))]
namespace XamMobile.iOS.DependencyServices
{
    public class iOSFileService : IFileService
    {
        private string currentData;
        public string GetDownloadFolder()
        {
            var documents = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);

            //is it above or equal to iOS 8?
            if (UIDevice.CurrentDevice.CheckSystemVersion(8, 0))
            {
                documents = NSFileManager.DefaultManager.GetUrls(NSSearchPathDirectory.DocumentDirectory, NSSearchPathDomain.User)[0].Path;
            }

            return documents;
        }

        public void OpenFile(string filePath)
        {
            var PreviewController = UIDocumentInteractionController.FromUrl(NSUrl.FromFilename(filePath));
            PreviewController.Delegate = new UIDocumentInteractionControllerDelegateClass(UIApplication.SharedApplication.KeyWindow.RootViewController);
            Device.BeginInvokeOnMainThread(() =>
            {
                PreviewController.PresentPreview(true);
            });
        }
    }

    public class UIDocumentInteractionControllerDelegateClass : UIDocumentInteractionControllerDelegate
    {
        UIViewController ownerVC;

        public UIDocumentInteractionControllerDelegateClass(UIViewController vc)
        {
            ownerVC = vc;
        }

        public override UIViewController ViewControllerForPreview(UIDocumentInteractionController controller)
        {
            return ownerVC;
        }

        public override UIView ViewForPreview(UIDocumentInteractionController controller)
        {
            return ownerVC.View;
        }
    }
}