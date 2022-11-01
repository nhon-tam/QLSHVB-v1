using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using XamMobile.EntityModels;
using XamMobile.Services.Models;

namespace XamMobile.Services
{
    public class VanBanService : BaseService, IVanBanService
    {
        public async Task<VanBanEntity> GetVanBanById(int vanBanId)
        {
            try
            {
                var userResponse = await GetRequestWithHandleErrorAsync<OdataResult<VanBanEntity>>($"{AppConstant.AppConstant.APIVanBan}?$filter=VanBanID eq {vanBanId}");
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

        public async Task<List<VanBanEntity>> GetDSVanBan()
        {
            try
            {
                var userResponse = await GetRequestWithHandleErrorAsync<OdataResult<List<VanBanEntity>>>($"{AppConstant.AppConstant.APIVanBan}");
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
