
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
    
public partial class S_MucLucHoSo
{

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
    public S_MucLucHoSo()
    {

        this.S_HopSo = new HashSet<S_HopSo>();

    }


    public int MucLucHoSoID { get; set; }

    public int LuuTruID { get; set; }

    public string TenMucLucHoSo { get; set; }

    public string MaDanhMuc { get; set; }

    public string MucLucSo { get; set; }

    public Nullable<System.DateTime> NgayTao { get; set; }

    public Nullable<System.DateTime> NgayCapNhat { get; set; }

    public Nullable<bool> isDeleted { get; set; }

    public string GhiChu { get; set; }



    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]

    public virtual ICollection<S_HopSo> S_HopSo { get; set; }

    public virtual S_LuuTru S_LuuTru { get; set; }

}

}
