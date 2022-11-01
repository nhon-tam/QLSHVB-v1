﻿using Common.Common;
using DocumentManagement.Common;
using DocumentManagement.Model;
using DocumentManagement.Model.Entity.TableOfContens;
using DocumentManagement.Models.DTO;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace DocumentManagement.DAL
{
    public class TableOfContentsDAL
    {
        private TableOfContentsDAL() { }

        private static volatile TableOfContentsDAL _instance;

        static object key = new object();

        public static TableOfContentsDAL GetTableOfContentsDALInstance
        {
            get
            {
                lock (key)
                {
                    if (_instance == null)
                    {
                        _instance = new TableOfContentsDAL();
                    }
                }

                return _instance;
            }

            private set
            {
                _instance = value;
            }
        }
        public async Task<ReturnResult<TableOfContents>> GetPagingWithSearchResults(BaseCondition<TableOfContents> condition)
        {
            DbProvider provider = new DbProvider();
            List<TableOfContents> list = new List<TableOfContents>();
            string outCode = String.Empty;
            string outMessage = String.Empty;
            string totalRecords = String.Empty;
            var result = new ReturnResult<TableOfContents>();
            try
            {
                provider.SetQuery("TableOfContents_GET_PAGING", System.Data.CommandType.StoredProcedure)
                    .SetParameter("InWhere", System.Data.SqlDbType.NVarChar, condition.IN_WHERE ?? String.Empty)
                    .SetParameter("InSort", System.Data.SqlDbType.NVarChar, condition.IN_SORT ?? String.Empty)
                    .SetParameter("StartRow", System.Data.SqlDbType.Int, condition.PageIndex)
                    .SetParameter("PageSize", System.Data.SqlDbType.Int, condition.PageSize)
                    .SetParameter("TotalRecords", System.Data.SqlDbType.Int, DBNull.Value, System.Data.ParameterDirection.Output)
                    .SetParameter("ErrorCode", System.Data.SqlDbType.NVarChar, DBNull.Value, 100, System.Data.ParameterDirection.Output)
                    .SetParameter("ErrorMessage", System.Data.SqlDbType.NVarChar, DBNull.Value, 4000, System.Data.ParameterDirection.Output).GetList<TableOfContents>(out list).Complete();

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

        public async Task<ReturnResult<TableOfContDTO>> GetAllTableOfContents()
        {
            List<TableOfContDTO> tableOfContList = new List<TableOfContDTO>();
            DbProvider dbProvider = new DbProvider();
            string outCode = String.Empty;
            string outMessage = String.Empty;
            int totalRows = 0;
            try
            {
                dbProvider.SetQuery("TableOfContents_GET_ALL", CommandType.StoredProcedure)
                .SetParameter("ErrorCode", SqlDbType.NVarChar, DBNull.Value, 100, ParameterDirection.Output)
                .SetParameter("ErrorMessage", SqlDbType.NVarChar, DBNull.Value, 4000, ParameterDirection.Output)
                .GetList<TableOfContDTO>(out tableOfContList)
                .Complete();
            }
            catch (Exception)
            {

                throw;
            }
            dbProvider.GetOutValue("ErrorCode", out outCode)
                       .GetOutValue("ErrorMessage", out outMessage);

            return new ReturnResult<TableOfContDTO>()
            {
                ItemList = tableOfContList,
                ErrorCode = outCode,
                ErrorMessage = outMessage,
                TotalRows = totalRows
            };
        }

        public ReturnResult<TableOfContents> TableOfContentsSearch(string searchStr)
        {
            List<TableOfContents> TableOfContentsList = new List<TableOfContents>();
            DbProvider dbProvider = new DbProvider();
            string outCode = String.Empty;
            string outMessage = String.Empty;
            int totalRows = 0;
            dbProvider.SetQuery("TableOfContents_SEARCH", CommandType.StoredProcedure)
                .SetParameter("ErrorCode", SqlDbType.NVarChar, DBNull.Value, 100, ParameterDirection.Output)
                .SetParameter("ErrorMessage", SqlDbType.NVarChar, DBNull.Value, 4000, ParameterDirection.Output)
                .GetList<TableOfContents>(out TableOfContentsList)
                .Complete();
            dbProvider.GetOutValue("ErrorCode", out outCode)
                       .GetOutValue("ErrorMessage", out outMessage);

            return new ReturnResult<TableOfContents>()
            {
                ItemList = TableOfContentsList,
                ErrorCode = outCode,
                ErrorMessage = outMessage,
                TotalRows = totalRows
            };
        }
        public async Task<ReturnResult<TableOfContents>> GetTableOfContentsByID(int tablleOfContentsID)
        {
            TableOfContents tableOfContentsList = new TableOfContents();
            DbProvider dbProvider = new DbProvider();
            string outCode = String.Empty;
            string outMessage = String.Empty;
            int totalRows = 0;
            dbProvider.SetQuery("TableOfContents_GET_BY_ID", CommandType.StoredProcedure)
                .SetParameter("MucLucHoSoID", SqlDbType.Int, tablleOfContentsID, ParameterDirection.Input)
                .SetParameter("ErrorCode", SqlDbType.NVarChar, DBNull.Value, 100, ParameterDirection.Output)
                .SetParameter("ErrorMessage", SqlDbType.NVarChar, DBNull.Value, 4000, ParameterDirection.Output)
                .GetSingle<TableOfContents>(out tableOfContentsList)
                .Complete();
            dbProvider.GetOutValue("ErrorCode", out outCode)
                       .GetOutValue("ErrorMessage", out outMessage);

            return new ReturnResult<TableOfContents>()
            {
                Item = tableOfContentsList,
                ErrorCode = outCode,
                ErrorMessage = outMessage,
                TotalRows = totalRows
            };
        }
        public ReturnResult<TableOfContents> GetTableOfContentsByFontID(BaseCondition<TableOfContents> condition)
        {
            List<TableOfContents> TableOfContentsList = new List<TableOfContents>();
            DbProvider dbProvider = new DbProvider();
            string outCode = String.Empty;
            string outMessage = String.Empty;
            var result = new ReturnResult<TableOfContents>();
            try
            {
                dbProvider.SetQuery("TableOfContents_GET_BY_FONTID", CommandType.StoredProcedure)
                .SetParameter("InWhere", System.Data.SqlDbType.NVarChar, condition.IN_WHERE == null ? "": condition.IN_WHERE)
                .SetParameter("InSort", System.Data.SqlDbType.NVarChar, condition.IN_SORT == null ? "" : condition.IN_SORT)
                .SetParameter("StartRow", System.Data.SqlDbType.Int, condition.PageIndex)
                .SetParameter("PageSize", System.Data.SqlDbType.Int, condition.PageSize)
                .SetParameter("TotalRecords", System.Data.SqlDbType.Int, DBNull.Value, System.Data.ParameterDirection.Output)
                .SetParameter("ErrorCode", SqlDbType.NVarChar, DBNull.Value, 100, ParameterDirection.Output)
                .SetParameter("ErrorMessage", SqlDbType.NVarChar, DBNull.Value, 4000, ParameterDirection.Output)
                .GetList<TableOfContents>(out TableOfContentsList)
                .Complete();

                if (TableOfContentsList.Count > 0)
                {
                    result.ItemList = TableOfContentsList;
                }
                dbProvider.GetOutValue("ErrorCode", out outCode)
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
        public ReturnResult<TableOfContents> GetTableOfContentsByRepositoryID(int repositoryID)
        {
            List<TableOfContents> TableOfContentsList = new List<TableOfContents>();
            DbProvider dbProvider = new DbProvider();
            string outCode = String.Empty;
            string outMessage = String.Empty;
            int totalRows = 0;
            dbProvider.SetQuery("TableOfContents_GET_BY_REPOSITORYID", CommandType.StoredProcedure)
                .SetParameter("KhoID", SqlDbType.Int, repositoryID, ParameterDirection.Input)
                .SetParameter("ErrorCode", SqlDbType.NVarChar, DBNull.Value, 100, ParameterDirection.Output)
                .SetParameter("ErrorMessage", SqlDbType.NVarChar, DBNull.Value, 4000, ParameterDirection.Output)
                .GetList<TableOfContents>(out TableOfContentsList)
                .Complete();
            dbProvider.GetOutValue("ErrorCode", out outCode)
                       .GetOutValue("ErrorMessage", out outMessage);

            return new ReturnResult<TableOfContents>()
            {
                ItemList = TableOfContentsList,
                ErrorCode = outCode,
                ErrorMessage = outMessage,
                TotalRows = totalRows
            };
        }
        public ReturnResult<TableOfContents> GetTableOfContentsByStorageID(int storageID)
        {
            List<TableOfContents> TableOfContentsList = new List<TableOfContents>();
            DbProvider dbProvider = new DbProvider();
            string outCode = String.Empty;
            string outMessage = String.Empty;
            int totalRows = 0;
            dbProvider.SetQuery("TableOfContents_GET_BY_STORAGEID", CommandType.StoredProcedure)
                .SetParameter("PhongID", SqlDbType.Int, storageID, ParameterDirection.Input)
                .SetParameter("ErrorCode", SqlDbType.NVarChar, DBNull.Value, 100, ParameterDirection.Output)
                .SetParameter("ErrorMessage", SqlDbType.NVarChar, DBNull.Value, 4000, ParameterDirection.Output)
                .GetList<TableOfContents>(out TableOfContentsList)
                .Complete();
            dbProvider.GetOutValue("ErrorCode", out outCode)
                       .GetOutValue("ErrorMessage", out outMessage);

            return new ReturnResult<TableOfContents>()
            {
                ItemList = TableOfContentsList,
                ErrorCode = outCode,
                ErrorMessage = outMessage,
                TotalRows = totalRows
            };
        }
        public ReturnResult<TableOfContents> DeleteTableOfContents(int tableOfContentsID) {
            List<TableOfContents> TableOfContentsList = new List<TableOfContents>();
            DbProvider dbProvider = new DbProvider();
            string outCode = String.Empty;
            string outMessage = String.Empty;
            int totalRows = 0;
            dbProvider.SetQuery("TableOfContents_DELETE", CommandType.StoredProcedure)
                .SetParameter("MucLucHoSoID", SqlDbType.Int, tableOfContentsID, ParameterDirection.Input)
                .SetParameter("ErrorCode", SqlDbType.NVarChar, DBNull.Value, 100, ParameterDirection.Output)
                .SetParameter("ErrorMessage", SqlDbType.NVarChar, DBNull.Value, 4000, ParameterDirection.Output)
                .GetList<TableOfContents>(out TableOfContentsList)
                .Complete();
            dbProvider.GetOutValue("ErrorCode", out outCode)
                       .GetOutValue("ErrorMessage", out outMessage);

            return new ReturnResult<TableOfContents>()
            {
                ItemList = TableOfContentsList,
                ErrorCode = outCode,
                ErrorMessage = outMessage,
                TotalRows = totalRows
            };
        }

        public ReturnResult<TableOfContents> UpdateTableOfContents(TableOfContents tableOfContents)
        {
            ReturnResult<TableOfContents> result;
            DbProvider dbProvider;
            try
            {
                result = new ReturnResult<TableOfContents>();
                dbProvider = new DbProvider();
                dbProvider.SetQuery("TableOfContents_EDIT", CommandType.StoredProcedure)
                 .SetParameter("MucLucHoSoID", SqlDbType.Int, tableOfContents.TabOfContID, ParameterDirection.Input)
                 .SetParameter("TenMucLucHoSo", SqlDbType.NVarChar, tableOfContents.TabOfContName, 50, ParameterDirection.Input)
                 .SetParameter("LuuTruID", SqlDbType.Int, tableOfContents.StorageID, ParameterDirection.Input)
                 .SetParameter("PhongID", SqlDbType.Int, tableOfContents.FontID, ParameterDirection.Input)
                 //.SetParameter("KhoID", SqlDbType.Int, tableOfContents.RepositoryID, ParameterDirection.Input)
                 .SetParameter("MucLucSo", SqlDbType.NVarChar, tableOfContents.TabOfContNumber, 50, ParameterDirection.Input)
                 .SetParameter("MaDanhMuc", SqlDbType.NVarChar, tableOfContents.TabOfContCode, 50, ParameterDirection.Input)
                 .SetParameter("GhiChu", SqlDbType.NVarChar, tableOfContents.Note, 50, ParameterDirection.Input)
                 .SetParameter("NgayCapNhat", SqlDbType.NVarChar, tableOfContents.UpdateTime, 50, ParameterDirection.Input)
                 .SetParameter("ErrorCode", SqlDbType.NVarChar, DBNull.Value, 100, ParameterDirection.Output)
                 .SetParameter("ErrorMessage", SqlDbType.NVarChar, DBNull.Value, 4000, ParameterDirection.Output)
                 .ExcuteNonQuery()
                 .Complete();
                dbProvider.GetOutValue("ErrorCode", out string errorCode)
                    .GetOutValue("ErrorMessage", out string errorMessage);
                if (errorCode.ToString() == "0")
                {
                    result.ErrorCode = "0";
                    result.ErrorMessage = "";
                }
                else if (errorCode.ToString() == "1")
                {
                    result.ErrorCode = "1";
                    result.ErrorMessage = "Table Of Content Is Exists";
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

        public ReturnResult<TableOfContents> InsertTableOfContents(TableOfContents TableOfContents)
        {
            TableOfContents tableOfCont = new TableOfContents();
            var result = new ReturnResult<TableOfContents>();
            DbProvider dbProvider = new DbProvider();
            string outCode = String.Empty;
            string outMessage = String.Empty;
            string totalRecords = String.Empty;
            int totalRows = 0;
            try
            {
                dbProvider.SetQuery("TableOfContents_INSERT", CommandType.StoredProcedure)
                .SetParameter("TenMucLucHoSo", SqlDbType.NVarChar, TableOfContents.TabOfContName, 50, ParameterDirection.Input)
                //.SetParameter("LuuTruID", SqlDbType.Int, TableOfContents.StorageID, ParameterDirection.Input)
                .SetParameter("PhongID", SqlDbType.Int, TableOfContents.FontID, ParameterDirection.Input)
                .SetParameter("isDeleted", SqlDbType.Int, TableOfContents.IsDeleted, ParameterDirection.Input)
                //.SetParameter("KhoID", SqlDbType.Int, TableOfContents.RepositoryID, ParameterDirection.Input)
                .SetParameter("MucLucSo", SqlDbType.NVarChar, TableOfContents.TabOfContNumber, 50, ParameterDirection.Input)
                .SetParameter("NgayTao", SqlDbType.NVarChar, TableOfContents.CreatTime, 50, ParameterDirection.Input)
                .SetParameter("MaDanhMuc", SqlDbType.NVarChar, TableOfContents.TabOfContCode, 50, ParameterDirection.Input)
                .SetParameter("GhiChu", SqlDbType.NVarChar, TableOfContents.Note, 50, ParameterDirection.Input)
                .SetParameter("ErrorCode", SqlDbType.NVarChar, DBNull.Value, 100, ParameterDirection.Output)
                .SetParameter("ErrorMessage", SqlDbType.NVarChar, DBNull.Value, 4000, ParameterDirection.Output)
                .GetSingle<TableOfContents>(out tableOfCont)
                .Complete();
                dbProvider.GetOutValue("ErrorCode", out outCode)
                           .GetOutValue("ErrorMessage", out outMessage);

                if (outCode != "0" || outCode == "")
                {
                    result.ErrorCode = outCode;
                    result.ErrorMessage = outMessage;
                }
                else
                {
                    result.Item = tableOfCont;
                    result.ErrorCode = outCode;
                    result.ErrorMessage = outMessage;
                }
            }
            catch (Exception)
            {

                throw;
            }
            return result;
        }

        //Phi
        public async Task<ReturnResult<TableOfContSelect2>> GetAllTabSelect2()
        {
            List<TableOfContSelect2> tableOfContSelect2s = new List<TableOfContSelect2>();
            DbProvider dbProvider = new DbProvider();
            string outCode = String.Empty;
            string outMessage = String.Empty;
            int totalRows = 0;
            try
            {
                dbProvider.SetQuery("Tab_GET_ALL_GETIDANDNAME_SELECT2", CommandType.StoredProcedure)
                .SetParameter("ErrorCode", SqlDbType.NVarChar, DBNull.Value, 100, ParameterDirection.Output)
                .SetParameter("ErrorMessage", SqlDbType.NVarChar, DBNull.Value, 4000, ParameterDirection.Output)
                .GetList<TableOfContSelect2>(out tableOfContSelect2s)
                .Complete();
            }
            catch (Exception)
            {

                throw;
            }
            dbProvider.GetOutValue("ErrorCode", out outCode)
                       .GetOutValue("ErrorMessage", out outMessage);

            return new ReturnResult<TableOfContSelect2>()
            {
                ItemList = tableOfContSelect2s,
                ErrorCode = outCode,
                ErrorMessage = outMessage,
                TotalRows = totalRows
            };
        }
    }
}
