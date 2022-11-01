using Common.Common;
using DocumentManagement.Common;
using DocumentManagement.DAL;
using DocumentManagement.Models.DTO;
using DocumentManagement.Models.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DocumentManagement.BUS
{
    public class LogBUS
    {
        private LogDAL logDAL = LogDAL.GetLogDALInstance;
        private LogBUS() { }

        private static volatile LogBUS _instance;

        static object key = new object();

        public static LogBUS GetLogBUSInstance
        {
            get
            {
                lock (key)
                {
                    if (_instance == null)
                    {
                        _instance = new LogBUS();
                    }
                }

                return _instance;
            }

            private set
            {
                _instance = value;
            }
        }
        public async Task<ReturnResult<Log>> GetLogWithPaging(BaseCondition<Log> condition)
        {
            return await logDAL.GetLogWithPaging(condition);
        }
        public async Task<ReturnResult<Log>> GetAllLog()
        {
            var result = await logDAL.GetAllLog();
            return result;
        }
        public async Task<ReturnResult<Log>> GetLogByID(int logId)
        {
            var rs = await logDAL.GetLogByID(logId);
            return rs;
        }
        public ReturnResult<Log> DeleteFont(int logId)
        {
            var rs = logDAL.DeleteLog(logId);
            return rs;
        }
        public ReturnResult<Log> UpdateLog(Log log)
        {
            var rs = logDAL.UpdateLog(log);
            return rs;
        }
        public ReturnResult<Log> InsertLog(Log log)
        {
            var rs = logDAL.InsertLog(log);
            return rs;
        }
    }
}
