//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace G02Apis.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class S_Page
    {
        public int PageID { get; set; }
        public Nullable<int> SystemID { get; set; }
        public string PageName { get; set; }
        public string URLPage { get; set; }
        public string NguoiTao { get; set; }
        public Nullable<System.DateTime> NgayTao { get; set; }
        public Nullable<System.DateTime> NgayCapNhat { get; set; }
    
        public virtual S_Uers_Atuthority S_Uers_Atuthority { get; set; }
    }
}
