using Acr.UserDialogs;
using Prism.Commands;
using Prism.Navigation;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using Xamarin.Forms;
using XamMobile.EntityModels;
using XamMobile.Models;
using XamMobile.Services;
using XamMobile.Views;

namespace XamMobile.ViewModels
{
    public class HomeMenuPageViewModel : ViewModelBase
    {
        private ObservableCollection<HoSoEntity> _notifications;
        public ObservableCollection<HoSoEntity> Notifications
        {
            get { return _notifications; }
            set { SetProperty(ref _notifications, value); }
        }

        public DelegateCommand GotoUserInfoPageCommand { get; private set; }
        public DelegateCommand GotoLogPageCommand { get; private set; }

        //INotificationService iNotificationService;
        IHoSoService hoSoService;

        public HomeMenuPageViewModel(INavigationService navigationService, IHoSoService hoSoService) : base(navigationService)
        {
            this.hoSoService = hoSoService;
            Notifications = new ObservableCollection<HoSoEntity>();

            GotoUserInfoPageCommand = new DelegateCommand(() => { GotoPage("UserPage"); });
            GotoLogPageCommand = new DelegateCommand(() => { GotoPage("LogPage"); });
            LoadAllData();
        }

        public void GotoPage(string page)
        {
            NavigatetoPage(page);
        }

        public async void NavigatetoPage(string page)
        {
            await NavigationService.NavigateAsync(page);
        }

        public override void OnNavigatedTo(INavigationParameters parameters)
        {
            base.OnNavigatedTo(parameters);
        }

        private async void LoadAllData()
        {
            using (UserDialogs.Instance.Loading("Đang tải"))
            {
                var notificationResults = (await hoSoService.GetDSHoSo()).OrderBy(x => x.TrangThai);
                if (notificationResults == null)
                {
                    UserDialogs.Instance.Alert("Có lỗi khi tải thông báo");
                    return;
                }
                Notifications.Clear();
                foreach (var item in notificationResults)
                {
                    Notifications.Add(item);
                }
                Console.WriteLine("");
            }
        }

        public async void OpenUserPopUp(object obj = null)
        {
            var navigationParamters = new NavigationParameters();
            navigationParamters.Add("obj", obj);
            await NavigationService.NavigateAsync("NotificationPopupPage", navigationParamters);
        }
    }
}
