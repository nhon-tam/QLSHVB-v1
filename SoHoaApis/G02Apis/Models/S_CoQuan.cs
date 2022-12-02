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
    
    public partial class S_CoQuan
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public S_CoQuan()
        {
            this.S_Phong = new HashSet<S_Phong>();
        }
    
        public int CoQuanID { get; set; }
        public string MaCoQuan { get; set; }
        public string TenCoQuan { get; set; }
        public Nullable<int> LoaiCoQuan { get; set; }
        public Nullable<bool> Deleted { get; set; }
        public Nullable<bool> Status { get; set; }
        public Nullable<int> DiaChiID { get; set; }
        public Nullable<System.DateTime> CreateDate { get; set; }
        public Nullable<System.DateTime> UpdateDate { get; set; }
        public string CreateBy { get; set; }
        public string UpdatedBy { get; set; }
        public string Description { get; set; }
        public string Notes { get; set; }
        public string AddressDetail { get; set; }
    
        public virtual DiaChi DiaChi { get; set; }
        public virtual S_LoaiCoQuan S_LoaiCoQuan { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<S_Phong> S_Phong { get; set; }
    }
}
