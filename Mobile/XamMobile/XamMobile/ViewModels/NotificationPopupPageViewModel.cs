using Prism.Navigation;
using System;
using System.Collections.Generic;
using System.Text;
using Xamarin.Forms;
using XamMobile.EntityModels;

namespace XamMobile.ViewModels
{
    public class NotificationPopupPageViewModel : ViewModelBase
    {
        private HoSoEntity _currentData;
        public HoSoEntity CurrentData
        {
            get { return _currentData; }
            set { SetProperty(ref _currentData, value); }
        }

        private string _htmlString;
        public string HtmlString
        {
            get { return _htmlString; }
            set { SetProperty(ref _htmlString, value); }
        }

        private HtmlWebViewSource _htmlWebViewSource;
        public HtmlWebViewSource HtmlWebViewSource
        {
            get { return _htmlWebViewSource; }
            set { SetProperty(ref _htmlWebViewSource, value); }
        }

        public NotificationPopupPageViewModel(INavigationService navigationService) : base(navigationService)
        {
            HtmlWebViewSource = new HtmlWebViewSource() { Html = "" };
            HtmlString = "";
        }


        public override void OnNavigatedTo(INavigationParameters parameters)
        {
            CurrentData = parameters.GetValue<HoSoEntity>("obj");
            //HtmlWebViewSource.Html = CurrentData.Content;
            base.OnNavigatedTo(parameters);
        }
    }
}
