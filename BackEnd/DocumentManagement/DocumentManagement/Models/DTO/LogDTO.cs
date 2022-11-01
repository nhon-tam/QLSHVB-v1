using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DocumentManagement.Models.DTO
{
    public class LogDTO
    {
        public string Action { get; set; }
        public int LogId { get; set; }
        public int VanBanId { get; set; }
    }
}
