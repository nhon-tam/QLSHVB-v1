﻿using Common.Common;
using DocumentManagement.Common;
using DocumentManagement.DAL;
using DocumentManagement.Model.Entity;
using DocumentManagement.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DocumentManagement.BUS
{
    public class FontBUS
    {
        private FontDAL fontDAL = FontDAL.GetFontDALInstance;
        private FontBUS() { }

        private static volatile FontBUS _instance;

        static object key = new object();

        public static FontBUS GetFontBUSInstance
        {
            get
            {
                lock (key)
                {
                    if (_instance == null)
                    {
                        _instance = new FontBUS();
                    }
                }

                return _instance;
            }

            private set
            {
                _instance = value;
            }
        }
        public async Task<ReturnResult<Font>> GetFontWithPaging(BaseCondition<Font> condition)
        {
            return await fontDAL.GetFontWithPaging(condition);
        }
        public ReturnResult<Font> GetPagingWithSearchResults(BaseCondition<Font> condition)
        {
            var result = fontDAL.GetPagingWithSearchResults(condition);
            return result;
        }
        public async Task<ReturnResult<FontDTO>> GetAllFont()
        {
            var result = await fontDAL.GetAllFont();
            return result;
        }
        public ReturnResult<Font> FontExport()
        {
            var result = fontDAL.FontExport();
            return result;
        }
        public async Task<ReturnResult<Font>> GetFontByID(int fontID)
        {
            var rs =await fontDAL.GetFontByID(fontID);
            return rs;
        }
        public async Task<ReturnResult<Font>> GetFontByCoQuanID(BaseCondition<Font> condition)
        {
            var rs = await fontDAL.GetFontByCoQuanID(condition);
            return rs;
        }
        public ReturnResult<Font> FontSearch(string searchStr)
        {
            var rs = fontDAL.FontSearch(searchStr);
            return rs;
        }
        public ReturnResult<Font> DeleteFont(int fontID)
        {
            var rs = fontDAL.DeleteFont(fontID);
            return rs;
        }
        public ReturnResult<Font> UpdateFont(Font font)
        {
            var rs = fontDAL.UpdateFont(font);
            return rs;
        }
        public ReturnResult<Font> InsertFont(Font font)
        {
            var rs = fontDAL.InsertFont(font);
            return rs;
        }

        public async Task<ReturnResult<FontSelect2>> GetAllFontSelect2()
        {
            var result = await fontDAL.GetAllFontSelect2();
            return result;
        }
    }
}
