using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace XamMobile.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class LoginPage : ContentPage
    {
        public LoginPage()
        {
            InitializeComponent();
            //var mainPage = Application.Current.MainPage as NavigationPage;
            //mainPage.BarTextColor = Color.White;
            //mainPage.BarBackgroundColor = Color.FromHex("#e46c0a");
        }
    }
}