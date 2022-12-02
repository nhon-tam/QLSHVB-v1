using Acr.UserDialogs;
using Prism.Commands;
using Prism.Navigation;
using Rg.Plugins.Popup.Contracts;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;
using XamMobile.EntityModels;
using XamMobile.Models;
using XamMobile.Services;

namespace XamMobile.ViewModels
{
    public class UserPopupPageViewModel:ViewModelBase
    {
        public DelegateCommand ClosePopupCommand { get; private set; }
        public DelegateCommand SaveNhanVienCommand { get; private set; }
        private NhanVienEntity _currentData;

        IUserService iUserService;
        public NhanVienEntity CurrentData
        {
            get { return _currentData; }
            set { SetProperty(ref _currentData, value); }
        }
        public UserPopupPageViewModel(INavigationService navigationService, IUserService iUserService) : base(navigationService)
        {
            this.iUserService = iUserService;
            SaveNhanVienCommand = new DelegateCommand(async() => { await SaveNhanVien(); });
        }

        public override void OnNavigatedTo(INavigationParameters parameters)
        {
            CurrentData = parameters.GetValue<NhanVienEntity>("obj");
            base.OnNavigatedTo(parameters);
        }

        public async Task SaveNhanVien()
        {
            if (CurrentData.NhanVienID == 0)
            {
                if (!CurrentData.UserID.HasValue || CurrentData.UserID == 0)
                    CurrentData.UserID = UserInfoSetting.UserInfos.UserID;
                if (CurrentData.NgaySinh == null)
                    CurrentData.NgaySinh = DateTime.Now;
            }
            if ("Nam".Equals(CurrentData.GioiTinhStr))
                CurrentData.GioiTinh = true;
            else
                CurrentData.GioiTinh = false;
            var res = await iUserService.SaveNhanVien(CurrentData);
            MessagingCenter.Send((App)Application.Current, "UpdateNhanVien", res);
            UserDialogs.Instance.Toast("Saved");
        }
    }
}
