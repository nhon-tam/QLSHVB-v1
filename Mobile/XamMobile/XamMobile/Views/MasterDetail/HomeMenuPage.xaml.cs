using Rg.Plugins.Popup.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using XamMobile.ViewModels;

namespace XamMobile.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class HomeMenuPage : ContentPage
    {
        private HomeMenuPageViewModel viewModel { get; set; }
        public HomeMenuPage()
        {
            InitializeComponent();
        }

        private void ListView_ItemSelected(object sender, SelectedItemChangedEventArgs e)
        {
            viewModel = (HomeMenuPageViewModel)BindingContext;
            var listView = ((ListView)sender);
            if (listView.SelectedItem == null)
                return;

            this.viewModel.OpenUserPopUp(e.SelectedItem);
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

    }
}