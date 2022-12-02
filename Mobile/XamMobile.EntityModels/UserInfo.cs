using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace XamMobile.EntityModels
{
    public class UserInfo : INotifyPropertyChanged
    {
        [JsonProperty("UserName")]
        public string UserName { get; set; }
        [JsonProperty("UserID")]
        public int UserID { get; set; }

        private string _anhDaiDien;
        [JsonProperty("AnhDaiDien")]
        public string AnhDaiDien {
            get
            {
                return _anhDaiDien;
            }
            set
            {
                _anhDaiDien = value;
                OnPropertyChanged(nameof(AnhDaiDien));
            }
        }

        public event PropertyChangedEventHandler PropertyChanged;
        protected virtual void OnPropertyChanged(string propertyName)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
    }
}
