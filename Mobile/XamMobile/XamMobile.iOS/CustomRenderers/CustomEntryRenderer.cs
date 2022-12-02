using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using CoreGraphics;
using Foundation;
using UIKit;
using Xamarin.Forms;
using Xamarin.Forms.Platform.iOS;
using XamMobile.CustomControls;
using XamMobile.iOS.CustomRenderers;

[assembly: ExportRenderer(typeof(CustomEntry), typeof(CustomEntryRenderer))]
namespace XamMobile.iOS.CustomRenderers
{
    public class CustomEntryRenderer : EntryRenderer
    {
        public static void Initialize() { }
        protected override void OnElementChanged(ElementChangedEventArgs<Entry> e)
        {
            base.OnElementChanged(e);
            if (Element == null)
                return;

            Element.HorizontalTextAlignment = TextAlignment.Start;
            Element.HeightRequest = 50;

            Control.LeftView = new UIView(new CGRect(0, 0, 10, 0));
            Control.LeftViewMode = UITextFieldViewMode.Always;
            Control.RightView = new UIView(new CGRect(0, 0, 10, 0));
            Control.RightViewMode = UITextFieldViewMode.Always;

            Layer.BackgroundColor = Color.FromHex("#F5F7FA").ToCGColor();
            Layer.BorderColor = Color.FromHex("#BCE0FD").ToCGColor();
            Layer.BorderWidth = 1;
            Layer.CornerRadius = 2;
        }
    }
}