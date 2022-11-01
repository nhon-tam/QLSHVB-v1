using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using XamMobile.EntityModels;
using XamMobile.Services.Models;

namespace XamMobile.Services
{
    public class LogService : BaseService, ILogService
    {
        public async Task<List<LogEntity>> GetLogs()
        {
            try
            {
                var userResponse = await GetRequestWithHandleErrorAsync<OdataResult<List<LogEntity>>>($"{AppConstant.AppConstant.APILog}");
                if (userResponse.Message.Code == ResponseCode.SUCCESS)
                {
                    return userResponse.Result.Results;
                }
                return null;
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}
