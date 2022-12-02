using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using XamMobile.EntityModels;
using XamMobile.Services.Models;

namespace XamMobile.Services
{
    public class NotificationService : BaseService, INotificationService
    {
        public async Task<List<NotificationEntity>> GetAllNotification(int ToaNhaId)
        {
            try
            {
                MessageResponse result = new MessageResponse();
                var res = await GetRequestWithHandleErrorAsync<OdataResult<List<NotificationEntity>>>($"{AppConstant.AppConstant.APIThongBao}?$filter=ToaNhaId eq {ToaNhaId}");
                if (res.Message.Code == ResponseCode.SUCCESS)
                {
                    return res.Result.Results;
                }
                return null;
            }
            catch
            {
                return null;
            }
        }
    }
}
