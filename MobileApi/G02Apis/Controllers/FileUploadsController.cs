using G02Apis.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace G02Apis.Controllers
{
    public class FileUploadsController : Controller
    {
        // GET: FileUploads
        private SoHoaEntities db = new SoHoaEntities();

        public FileResult Download(string key)
        {
            var path = db.FileUploads.Where(x => x.FileKey == key).ToList();
            if (path == null || path.Count == 0)
                throw new HttpException(404, "File not found!");
            System.IO.FileInfo fi = new System.IO.FileInfo(path[0].FilePath);
            return File(path[0].FilePath, fi.GetType().ToString());
        }

        public FileResult Excel(string key)
        {
            string root = @"~/FileUpload";
            string fPath = root + "\\" + key + ".xlsx";
            System.IO.FileInfo fi = new System.IO.FileInfo(fPath);
            return File(fPath, System.Net.Mime.MediaTypeNames.Application.Octet, "export" + fi.Extension);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}