using Acr.UserDialogs;
using Newtonsoft.Json;
using Prism.Commands;
using Prism.Mvvm;
using Prism.Navigation;
using Refit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using Xamarin.Essentials;
using Xamarin.Forms;
using XamMobile.Constants;
using XamMobile.Models;
using XamMobile.Services.Interfaces;
using XamMobile.Views;

namespace XamMobile.ViewModels
{
    public class LoginPageViewModel : ViewModelBase
    {
        public DelegateCommand GotoHomePageCommand { get; private set; }

        private string _userName;
        public string UserName
        {
            get { return _userName; }
            set { SetProperty(ref _userName, value); }
        }

        private string _password;
        public string Password
        {
            get { return _password; }
            set { SetProperty(ref _password, value); }
        }

        public LoginPageViewModel(INavigationService navigationService) : base(navigationService)
        {
            GotoHomePageCommand = new DelegateCommand(GotoHomePage);
        }

        public async void GotoHomePage()
        {
            using (UserDialogs.Instance.Loading("Đang đăng nhập"))
            {
                var handler = new HttpClientHandler
                {
                    ServerCertificateCustomValidationCallback = (message, cert, chain, sslErrors) => true
                };
                var httpClient = new HttpClient(handler)
                {
                    BaseAddress = new Uri(AppConstant.Endpoint)
                };

                var authenticationService = RestService.For<IAuthenticationService>(httpClient);

                if (string.IsNullOrEmpty(UserName) || string.IsNullOrEmpty(Password))
                {
                    UserDialogs.Instance.Alert("Không được để trống mục tài khoản hoặc mật khẩu");
                    return;
                }

                var loginAccount = new Account
                {
                    UserName = UserName,
                    Password = Password
                };

                try
                {

                    var res = await authenticationService.Login(loginAccount);

                    if (res.IsSuccess)
                    {
                        await SecureStorage.SetAsync("CurrentUser", JsonConvert.SerializeObject(res.Item));

                        await NavigationService.NavigateAsync(nameof(MenuPage) + "/" + nameof(NavigationPage) + "/" + nameof(HomeMenuPage));
                    }
                    else
                    {
                        UserDialogs.Instance.Alert("Tài khoản hoặc mật khẩu không hợp lệ");
                    }
                }
                catch(Exception ex)
                {
                    UserDialogs.Instance.Alert(ex.Message);
                }
            }
        }
    }
}
