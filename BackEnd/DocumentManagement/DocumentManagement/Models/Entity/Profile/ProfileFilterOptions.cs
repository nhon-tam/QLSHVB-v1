using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DocumentManagement.Models.Entity.Profile
{
    public class ProfileFilterOptions
    {
        public List<string?>? lstFileCode {get; set;}
        public List<string?>? lstTitle { get; set; }
        public List<string?>? lstGearBoxCode { get; set; }
    }
}
