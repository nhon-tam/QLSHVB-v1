
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
    
public partial class S_LoaiVanBan
{

    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
    public S_LoaiVanBan()
    {

        this.S_VanBan = new HashSet<S_VanBan>();

    }


    public int LoaiVanBanID { get; set; }

    public string TenLoaiVanBan { get; set; }

    public Nullable<bool> IsDeleted { get; set; }



    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]

    public virtual ICollection<S_VanBan> S_VanBan { get; set; }

}

}
