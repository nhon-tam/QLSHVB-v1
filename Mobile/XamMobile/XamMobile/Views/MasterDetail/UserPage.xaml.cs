using Rg.Plugins.Popup.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xam.Plugin;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using XamMobile.EntityModels;
using XamMobile.ViewModels;

namespace XamMobile.Views.MasterDetail
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class UserPage : ContentPage
    {
        private UserPageViewModel viewModel { get; set; }
        public PopupMenu Popup { get; set; }
        public UserPage()
        {
            InitializeComponent();
        }

        private void ListView_ItemSelected(object sender, SelectedItemChangedEventArgs e)
        {
            viewModel = (UserPageViewModel)BindingContext;
            var listView = ((ListView)sender);
            if (listView.SelectedItem == null)
                return;

            listView.SelectedItem = null;
        }

        //protected override bool OnBackButtonPressed()
        //{
        //    if (PopupNavigation.Instance.PopupStack.Count > 0)
        //    {
        //        Action ac = async () => await PopupNavigation.Instance.PopAllAsync(true);
        //        ac.Invoke();
        //        return true;
        //    }
        //    return base.OnBackButtonPressed();
        //}
        protected override bool OnBackButtonPressed() => true;

        void ShowPopup_Clicked(object sender, EventArgs e)
        {
            var but = (Button)sender;
            var data = (NhanVienEntity)but.CommandParameter;
            this.viewModel = (UserPageViewModel)BindingContext;
            Popup = new PopupMenu()
            {
                BindingContext = viewModel
            };
            Popup.SetBinding(PopupMenu.ItemsSourceProperty, "ActionDatasource");
            Popup?.ShowPopup(sender as View);
        }

        //void CaseUploadFileClicked(string val, object obj)
        //{
        //    if (val == "Chỉnh sửa")
        //    {
        //        this.viewModel.OpenUserPopUp(obj);
        //    }
        //}

        private void OnUpdateButtonClicked(object sender, EventArgs e)
        {
            this.viewModel = (UserPageViewModel)BindingContext;
            this.viewModel.OpenUserPopUp(this.viewModel.UserInfoModel);
        }
    }
}