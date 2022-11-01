using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using XamMobile.Services.Models;

namespace XamMobile.Services
{
    public class UploadFileService : BaseService, IUploadFileService
    {
        public async Task<string> UploadFile(FileUploaded files)
        {
            try
            {
                var res = await base.UploadFile<string>(AppConstant.AppConstant.APIUploadImage, files);
                return res;
            }
            catch (Exception ex)
            {
                return "";
            }
        }

    }
}
