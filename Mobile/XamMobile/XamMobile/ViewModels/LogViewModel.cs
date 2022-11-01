using Acr.UserDialogs;
using Plugin.Permissions.Abstractions;
using Prism.Navigation;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using Xamarin.Forms;
using XamMobile.DependencyServices;
using XamMobile.EntityModels;
using XamMobile.Models;
using XamMobile.Services;
using XamMobile.Ultil;

namespace XamMobile.ViewModels
{
    public class LogViewModel : ViewModelBase
    {
        private ObservableCollection<LogEntity> _logs;
        public ObservableCollection<LogEntity> Logs
        {
            get { return _logs; }
            set { SetProperty(ref _logs, value); }
        }

        //private ObservableCollection<string> _actionDatasource;
        //public ObservableCollection<string> ActionDatasource
        //{
        //    get { return _actionDatasource; }
        //    set { SetProperty(ref _actionDatasource, value); }
        //}

        private double _logListHeight;
        public double LogListHeight
        {
            get { return _logListHeight; }
            set { SetProperty(ref _logListHeight, value); }
        }

        ILogService logService;
        IVanBanService vanBanService;
        IUserService userService;
        IPermissionService _permissionService;
        DownloadService downloadService { get; set; }
        IFileService _fileService;

        public LogViewModel(INavigationService navigationService, ILogService logService, IUserService userService, IVanBanService vanBanService) : base(navigationService)
        {
            this.vanBanService = vanBanService;
            this.userService = userService;
            this.logService = logService;
            Logs = new ObservableCollection<LogEntity>();
            _permissionService = Xamarin.Forms.DependencyService.Get<DependencyServices.IPermissionService>();
            _fileService = Xamarin.Forms.DependencyService.Get<DependencyServices.IFileService>();
            downloadService = new DownloadService(_permissionService, _fileService);
        }

        public override void OnNavigatedTo(INavigationParameters parameters)
        {
            base.OnNavigatedTo(parameters);
            LoadAllData();
        }

        private void CalculateHeight()
        {
            LogListHeight = Logs.Count * 90;
        }

        private async void LoadAllData()
        {
            using (UserDialogs.Instance.Loading("Đang tải"))
            {
                var logEntities = await logService.GetLogs();
                var users = await userService.GetUsers();
                var documents = await vanBanService.GetDSVanBan();
                foreach (var item in logEntities)
                {
                    item.SoVanBan = documents.Find(x => x.VanBanID == item.VanBanId)?.SoVanBan;
                    item.TenNguoiTao = users.Find(x => x.UserID == item.CreatedBy)?.UserName;
                }
                if (logEntities == null)
                {
                    UserDialogs.Instance.Alert("Có lỗi khi tải thông tin nhật ký");
                    return;
                }
                Logs.Clear();
                logEntities = logEntities.OrderByDescending(x => x.CreatedDate).ToList();
                foreach (var item in logEntities)
                {
                    Logs.Add(item);
                }
                CalculateHeight();
            }
        }
    }
}
