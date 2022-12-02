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
    public partial class MenuPage : Xamarin.Forms.MasterDetailPage {
        private MenuPageViewModel viewModel { get; set; }
        public MenuPage() {
            InitializeComponent();
            viewModel = (MenuPageViewModel)BindingContext;
            viewModel.CurrentPage = this;
        }
    }
}