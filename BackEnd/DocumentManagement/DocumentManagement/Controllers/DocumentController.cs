using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Common.Common;
using DocumentManagement.BUS;
using DocumentManagement.Common;
using DocumentManagement.FrameWork;
using DocumentManagement.Models.Entity;
using DocumentManagement.Models.Entity.Document;
using DocumentManagement.Models.Entity.Profile;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DocumentManagement.Controllers
{
    public class DocumentController : BaseApiController
    {
        private static LogBUS logBUS = LogBUS.GetLogBUSInstance;
        private static UserBUS userBUS = UserBUS.GetUserBUSInstance;
        [HttpGet]
        public IActionResult GetAllDocument()
        {
            DocumentBUS documentBUS = new DocumentBUS();
            var result = documentBUS.GetAllDocument();
            return Ok(result);
        }
        [HttpGet]
        [Route("{documentId}")]
        
        public IActionResult GetDocumentById(int documentId)
        {
            //Response.Headers.Add("Cache-Control", "no-cache, no-store");
            DocumentBUS documentBUS = new DocumentBUS();
            var result = documentBUS.GetDocumentById(documentId);
            return Ok(result);
        }

        /// <summary>
        /// thêm văn bản + insert chữ ký số
        /// </summary>
        /// <param name="document"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult CreateDocument([FromBody] Document document, [FromQuery] string name = "", [FromQuery] string docPath = "")
        {
            DocumentBUS documentBUS = new DocumentBUS();
            bool hasSignature = false;
            if (!string.IsNullOrEmpty(name) && !string.IsNullOrEmpty(docPath))
            {
                hasSignature = FilesUtillities.InsertSignatureIntoDocument(name, docPath);
            }
            if (hasSignature)
            {
                document.Signature = 1;
            }
            var result = documentBUS.CreateDocument(document);
            if (result.IsSuccess)
            {
                var doc = documentBUS.GetDocumentBySoVanBan(document.CodeNumber);
                CreateLog(doc.Item, document.CreatedBy);
            }
            return Ok(result);
        }

        [HttpPost]
        public IActionResult UpdateDocument([FromBody] Document document, [FromQuery] string? name, [FromQuery] string? docPath)
        {
            DocumentBUS documentBUS = new DocumentBUS();
            bool hasSignature = false;
            if (!string.IsNullOrEmpty(name) && !string.IsNullOrEmpty(docPath))
            {
                hasSignature = FilesUtillities.InsertSignatureIntoDocument(name, docPath);
            }
            if (hasSignature)
            {
                document.Signature = 1;
            }
            var result = documentBUS.UpdateDocument(document);
            if (result.IsSuccess)
            {
                CreateLog(document, document.UpdatedBy, true);
            }
            return Ok(result);
        }

        private void CreateLog(Document document, string userName, bool isUpdate = false)
        {
            var user = userBUS.GetUserByUserName(userName);
            Log log = new Log();
            log.Action = isUpdate ? "Cập nhật văn bản" : "Thêm mới văn bản";
            log.CreatedDate = DateTime.Now;
            log.UpdatedDate = DateTime.Now;
            log.VanBanId = document.DocumentId;
            log.UpdatedBy = user.Item.Id;
            log.CreatedBy = user.Item.Id;
            logBUS.InsertLog(log);
        }
        [HttpPost]
        public IActionResult DeleteDocument(Document document)
        {
            DocumentBUS documentBUS = new DocumentBUS();
            var result = documentBUS.DeleteDocument(document);
            return Ok(result);
        }

        [HttpPost]
        public IActionResult GetPagingWithSearchResults(BaseCondition<DocumentPaging> condition)
        {

            DocumentBUS documentBUS = new DocumentBUS();
            var result = documentBUS.GetPagingWithSearchResults(condition);
            return Ok(result);
        }

        [HttpPost]
        public IActionResult GetDocumentPaging(BaseCondition<DocumentSearch> condition)
        {
            DocumentBUS documentBUS = new DocumentBUS();
            var result = documentBUS.GetDocumentPaging(condition);
            return Ok(result);
        }

        [HttpGet]
        public IActionResult GetListByProfileId(Profiles profile)
        {
            DocumentBUS documentBUS = new DocumentBUS();
            var result = documentBUS.GetListByProfileId(profile);
            return Ok(result);
        }
        
    }
}