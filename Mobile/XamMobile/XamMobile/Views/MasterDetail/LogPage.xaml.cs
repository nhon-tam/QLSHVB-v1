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
    public partial class LogPage : ContentPage
    {
        public PopupMenu Popup { get; set; }
        private LogViewModel viewModel { get; set; }
        public LogPage()
        {
            InitializeComponent();
        }

        private void ListView_ItemSelected(object sender, SelectedItemChangedEventArgs e)
        {
            viewModel = (LogViewModel)BindingContext;
            var listView = ((ListView)sender);
            if (listView.SelectedItem == null)
                return;

            listView.SelectedItem = null;
        }

        //void ShowPopup_Clicked(object sender, EventArgs e)
        //{
        //    var but = (Button)sender;
        //    var data = (PhieuThuEntity)but.CommandParameter;
        //    this.viewModel = (LogViewModel)BindingContext;
        //    Popup = new PopupMenu()
        //    {
        //        BindingContext = viewModel
        //    };
        //    Popup.OnItemSelected += (item) =>
        //    {
        //        CaseUploadFileClicked(item, data);
        //    };
        //    Popup.SetBinding(PopupMenu.ItemsSourceProperty, "ActionDatasource");
        //    Popup?.ShowPopup(sender as View);
        //}
    }
}