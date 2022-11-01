using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using XamMobile.EntityModels;
using XamMobile.Services.Models;

namespace XamMobile.Services
{
    public interface INotificationService
    {
        Task<List<NotificationEntity>> GetAllNotification(int ToaNhaId);
    }
}
