using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DocumentManagement.Models.Entity
{
    public class Log
    {
        public int LogId { get; set; }
        public string Action { get; set; }
        public int VanBanId { get; set; }
        public DateTime CreatedDate { get; set; }
        public int CreatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public int UpdatedBy { get; set; }
        public bool IsDeleted { get; set; }
        public string DocumentNumber { get; set; }
        public string UserName { get; set; }
    }
}
