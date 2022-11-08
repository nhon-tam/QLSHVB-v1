using Prism.Commands;
using Prism.Mvvm;
using Prism.Navigation;
using System;
using System.Collections.Generic;
using System.Linq;

namespace XamMobile.ViewModels
{
    public class HomeMenuPageViewModel : ViewModelBase
    {
        public HomeMenuPageViewModel(INavigationService navigationService) : base(navigationService)
        {
        }
    }
}
