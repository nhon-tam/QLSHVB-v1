using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using XamMobile.EntityModels;
using XamMobile.Services.Models;

namespace XamMobile.Services
{
    public class HoSoService : BaseService, IHoSoService
    {
        public async Task<List<HoSoEntity>> GetDSHoSo()
        {
            try
            {
                var userResponse = await GetRequestWithHandleErrorAsync<OdataResult<List<HoSoEntity>>>($"{AppConstant.AppConstant.APIHoSo}");
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
