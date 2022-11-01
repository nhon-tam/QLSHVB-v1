using Common.Common;
using DocumentManagement.Common;
using DocumentManagement.Model;
using DocumentManagement.Models.DTO;
using DocumentManagement.Models.Entity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace DocumentManagement.DAL
{
    public class LogDAL
    {
        private LogDAL() { }

        private static volatile LogDAL _instance;

        static object key = new object();

        public static LogDAL GetLogDALInstance
        {
            get
            {
                lock (key)
                {
                    if (_instance == null)
                    {
                        _instance = new LogDAL();
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
            DbProvider provider = new DbProvider();
            List<Log> list = new List<Log>();
            string outCode = String.Empty;
            string outMessage = String.Empty;
            string totalRecords = String.Empty;
            var result = new ReturnResult<Log>();
            try
            {
                provider.SetQuery("LOG_GET_PAGING", System.Data.CommandType.StoredProcedure)
                    .SetParameter("InWhere", System.Data.SqlDbType.NVarChar, condition.IN_WHERE ?? String.Empty)
                    .SetParameter("InSort", System.Data.SqlDbType.NVarChar, condition.IN_SORT ?? String.Empty)
                    .SetParameter("StartRow", System.Data.SqlDbType.Int, condition.PageIndex)
                    .SetParameter("PageSize", System.Data.SqlDbType.Int, condition.PageSize)
                    .SetParameter("TotalRecords", System.Data.SqlDbType.Int, DBNull.Value, System.Data.ParameterDirection.Output)
                    .SetParameter("ErrorCode", System.Data.SqlDbType.NVarChar, DBNull.Value, 100, System.Data.ParameterDirection.Output)
                    .SetParameter("ErrorMessage", System.Data.SqlDbType.NVarChar, DBNull.Value, 4000, System.Data.ParameterDirection.Output).GetList<Log>(out list).Complete();

                if (list.Count > 0)
                {
                    result.ItemList = list;
                }
                provider.GetOutValue("ErrorCode", out outCode)
                           .GetOutValue("ErrorMessage", out outMessage)
                           .GetOutValue("TotalRecords", out string totalRows);

                if (outCode != "0")
                {
                    result.ErrorCode = outCode;
                    result.ErrorMessage = outMessage;
                }
                else
                {
                    result.ErrorCode = "";
                    result.ErrorMessage = "";
                    result.TotalRows = int.Parse(totalRows);
                }
            }
            catch (Exception ex)
            {
                result.ErrorMessage = ex.Message;
            }
            return result;
        }
        public async Task<ReturnResult<Log>> GetAllLog()
        {
            List<Log> logList = new List<Log>();
            DbProvider dbProvider = new DbProvider();
            string outCode = String.Empty;
            string outMessage = String.Empty;
            int totalRows = 0;
            try
            {
                dbProvider.SetQuery("LOG_GET_ALL", CommandType.StoredProcedure)
                .SetParameter("ErrorCode", SqlDbType.NVarChar, DBNull.Value, 100, ParameterDirection.Output)
                .SetParameter("ErrorMessage", SqlDbType.NVarChar, DBNull.Value, 4000, ParameterDirection.Output)
                .GetList<Log>(out logList)
                .Complete();
            }
            catch (Exception)
            {

                throw;
            }
            dbProvider.GetOutValue("ErrorCode", out outCode)
                       .GetOutValue("ErrorMessage", out outMessage);

            return new ReturnResult<Log>()
            {
                ItemList = logList,
                ErrorCode = outCode,
                ErrorMessage = outMessage,
                TotalRows = totalRows
            };
        }
        public async Task<ReturnResult<Log>> GetLogByID(int logId)
        {
            var result = new ReturnResult<Log>();
            Log item = new Log();
            DbProvider dbProvider = new DbProvider();
            string outCode = String.Empty;
            string outMessage = String.Empty;
            int totalRows = 0;
            try
            {
                dbProvider.SetQuery("LOG_GET_BY_ID", CommandType.StoredProcedure)
               .SetParameter("LogId", SqlDbType.Int, logId, ParameterDirection.Input)
               .SetParameter("ErrorCode", SqlDbType.NVarChar, DBNull.Value, 100, ParameterDirection.Output)
               .SetParameter("ErrorMessage", SqlDbType.NVarChar, DBNull.Value, 4000, ParameterDirection.Output)
               .GetSingle<Log>(out item)
               .Complete();

            }
            catch (Exception ex)
            {

                throw;
            }
            dbProvider.GetOutValue("ErrorCode", out outCode)
                       .GetOutValue("ErrorMessage", out outMessage);

            return new ReturnResult<Log>()
            {
                Item = item,
                ErrorCode = outCode,
                ErrorMessage = outMessage,
                TotalRows = totalRows
            };
        }
        public ReturnResult<Log> DeleteLog(int PhongID)
        {
            DbProvider provider = new DbProvider();
            var result = new ReturnResult<Log>();
            string outCode = String.Empty;
            string outMessage = String.Empty;
            string totalRecords = String.Empty;
            Log item = new Log();
            try
            {
                provider.SetQuery("LOG_DELETE", CommandType.StoredProcedure)
                     .SetParameter("PhongID", SqlDbType.Int, PhongID, ParameterDirection.Input)
                    .SetParameter("ErrorCode", SqlDbType.NVarChar, DBNull.Value, 100, System.Data.ParameterDirection.Output)
                    .SetParameter("ErrorMessage", SqlDbType.NVarChar, DBNull.Value, 4000, System.Data.ParameterDirection.Output)
                    .ExcuteNonQuery().Complete();

                provider.GetOutValue("ErrorCode", out outCode)
                          .GetOutValue("ErrorMessage", out outMessage);

                if (outCode != "0")
                {
                    result.Failed(outCode, outMessage);
                }
                else
                {
                    result.ErrorCode = "0";
                    result.ErrorMessage = "";
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return result;
        }
        public ReturnResult<Log> UpdateLog(Log Log)
        {
            ReturnResult<Log> result;
            DbProvider db;
            try
            {
                result = new ReturnResult<Log>();
                db = new DbProvider();
                db.SetQuery("LOG_EDIT", CommandType.StoredProcedure)
                    .SetParameter("LogId", SqlDbType.Int, Log.LogId, ParameterDirection.Input)
                    .SetParameter("Action", SqlDbType.NVarChar, Log.Action, 64, ParameterDirection.Input)
                    .SetParameter("VanBanId", SqlDbType.Int, Log.VanBanId, ParameterDirection.Input)
                    .SetParameter("CreatedDate", SqlDbType.DateTime, Log.CreatedDate, ParameterDirection.Input)
                    .SetParameter("UpdatedDate", SqlDbType.DateTime, Log.UpdatedDate, ParameterDirection.Input)
                    .SetParameter("CreatedBy", SqlDbType.Int, Log.CreatedBy, ParameterDirection.Input)
                    .SetParameter("UpdatedBy", SqlDbType.Int, Log.UpdatedBy, ParameterDirection.Input)
                    .SetParameter("IsDeleted", SqlDbType.Bit, Log.IsDeleted, ParameterDirection.Input)
                    .SetParameter("ErrorCode", SqlDbType.NVarChar, DBNull.Value, 100, ParameterDirection.Output)
                    .SetParameter("ErrorMessage", SqlDbType.NVarChar, DBNull.Value, 4000, ParameterDirection.Output)
                    .ExcuteNonQuery()
                    .Complete();
                db.GetOutValue("ErrorCode", out string errorCode)
                    .GetOutValue("ErrorMessage", out string errorMessage);
                if (errorCode.ToString() == "0")
                {
                    result.ErrorCode = "0";
                    result.ErrorMessage = "";
                }
                else
                {
                    result.Failed(errorCode, errorMessage);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return result;
        }
        public ReturnResult<Log> InsertLog(Log Log)
        {

            DbProvider provider = new DbProvider();
            var result = new ReturnResult<Log>();
            string outCode = String.Empty;
            string outMessage = String.Empty;
            string totalRecords = String.Empty;
            try
            {
                provider.SetQuery("LOG_CREATE", CommandType.StoredProcedure)
                .SetParameter("Action", SqlDbType.NVarChar, Log.Action, 64, ParameterDirection.Input)
                .SetParameter("VanBanId", SqlDbType.Int, Log.VanBanId, ParameterDirection.Input)
                .SetParameter("CreatedDate", SqlDbType.DateTime, Log.CreatedDate, ParameterDirection.Input)
                .SetParameter("UpdatedDate", SqlDbType.DateTime, Log.UpdatedDate, ParameterDirection.Input)
                .SetParameter("CreatedBy", SqlDbType.Int, Log.CreatedBy, ParameterDirection.Input)
                .SetParameter("UpdatedBy", SqlDbType.Int, Log.UpdatedBy, ParameterDirection.Input)
                .SetParameter("IsDeleted", SqlDbType.Bit, Log.IsDeleted, ParameterDirection.Input)
                .SetParameter("ErrorCode", SqlDbType.NVarChar, DBNull.Value, 100, ParameterDirection.Output)
                .SetParameter("ErrorMessage", SqlDbType.NVarChar, DBNull.Value, 4000, ParameterDirection.Output)
                    .GetSingle<Log>(out Log).Complete();

                provider.GetOutValue("ErrorCode", out outCode)
                          .GetOutValue("ErrorMessage", out outMessage);

                if (outCode != "0" || outCode == "")
                {
                    result.ErrorCode = outCode;
                    result.ErrorMessage = outMessage;
                }
                else
                {
                    result.Item = Log;
                    result.ErrorCode = outCode;
                    result.ErrorMessage = outMessage;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return result;
        }
    }
}
