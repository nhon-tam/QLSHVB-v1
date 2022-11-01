using Prism.Commands;
using Prism.Mvvm;
using Prism.Navigation;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using Xamarin.Forms;
using XamMobile.Views;
using XamMobile.Views.MasterDetail;

namespace XamMobile.ViewModels
{
    public class MyMenuItem
    {

        public string Title { get; set; }
        public string Icon { get; set; }
        public string PageName { get; set; }
    }
    public class MenuPageViewModel : BindableBase
    {
        private INavigationService _navigationService;
        public MenuPage CurrentPage { get; set; }

        public ObservableCollection<MyMenuItem> MenuItems { get; set; }

        private MyMenuItem selectedMenuItem;
        public MyMenuItem SelectedMenuItem
        {
            get => selectedMenuItem;
            set => SetProperty(ref selectedMenuItem, value);
        }

        public DelegateCommand NavigateCommand { get; private set; }

        public MenuPageViewModel(INavigationService navigationService)
        {
            _navigationService = navigationService;

            MenuItems = new ObservableCollection<MyMenuItem>();

            MenuItems.Add(new MyMenuItem()
            {
                Icon = "home_icon_red.png",
                PageName = nameof(HomeMenuPage),
                Title = "Trang chủ"
            });

            MenuItems.Add(new MyMenuItem()
            {
                Icon = "conference_red_icon.png",
                PageName = nameof(UserPage),
                Title = "Tài khoản"
            });

            MenuItems.Add(new MyMenuItem()
            {
                Icon = "logout_icon_red.png",
                PageName = "Logout",
                Title = "Đăng xuất"
            });

            NavigateCommand = new DelegateCommand(Navigate);
        }

        async void Navigate()
        {
            if (SelectedMenuItem == null)
                return;
            var pageName = SelectedMenuItem.PageName;
            if (pageName == "Logout")
            {
                await CurrentPage.Navigation.PopToRootAsync(true);
            }
            await _navigationService.NavigateAsync(nameof(NavigationPage) + "/" + pageName);
            SelectedMenuItem = null;
        }
    }
}
