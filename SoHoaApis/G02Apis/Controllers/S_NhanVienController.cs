using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using System.Web.Http.OData;
using System.Web.Http.OData.Routing;
using G02Apis.Models;

namespace G02Apis.Controllers
{
    /*
    The WebApiConfig class may require additional changes to add a route for this controller. Merge these statements into the Register method of the WebApiConfig class as applicable. Note that OData URLs are case sensitive.

    using System.Web.Http.OData.Builder;
    using System.Web.Http.OData.Extensions;
    using G02Apis.Models;
    ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
    builder.EntitySet<S_NhanVien>("S_NhanVien");
    builder.EntitySet<S_Users>("S_Users"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class S_NhanVienController : ODataController
    {
        private SoHoaEntities db = new SoHoaEntities();

        // GET: odata/S_NhanVien
        [EnableQuery]
        public IQueryable<S_NhanVien> GetS_NhanVien()
        {
            return db.S_NhanVien;
        }

        // GET: odata/S_NhanVien(5)
        [EnableQuery]
        public SingleResult<S_NhanVien> GetS_NhanVien([FromODataUri] int key)
        {
            return SingleResult.Create(db.S_NhanVien.Where(s_NhanVien => s_NhanVien.NhanVienID == key));
        }

        // PUT: odata/S_NhanVien(5)
        public async Task<IHttpActionResult> Put([FromODataUri] int key, S_NhanVien patch)
        {
            Validate(patch);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            S_NhanVien s_NhanVien = await db.S_NhanVien.FindAsync(key);
            if (s_NhanVien == null)
            {
                return NotFound();
            }

            s_NhanVien.TenNhanVien = patch.TenNhanVien;
            s_NhanVien.AnhDaiDien = patch.AnhDaiDien;
            s_NhanVien.Email = patch.Email;
            s_NhanVien.GioiTinh = patch.GioiTinh;
            s_NhanVien.NguyenQuan = patch.NguyenQuan;
            s_NhanVien.SoCMT = patch.SoCMT;
            s_NhanVien.NgayCap = patch.NgayCap;
            s_NhanVien.NoiCap = patch.NoiCap;
            s_NhanVien.SoDienThoai = patch.SoDienThoai;
            s_NhanVien.Email = patch.Email;

            //patch.Put(s_NhanVien);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!S_NhanVienExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(s_NhanVien);
        }

        // POST: odata/S_NhanVien
        public async Task<IHttpActionResult> Post(S_NhanVien s_NhanVien)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (s_NhanVien.NhanVienID == 0)
            {
                db.S_NhanVien.Add(s_NhanVien);
                return Created(s_NhanVien);
            }
            else
            {
                S_NhanVien nhanVien = await db.S_NhanVien.FindAsync(s_NhanVien.NhanVienID);
                if (s_NhanVien == null)
                {
                    return NotFound();
                }
                nhanVien.TenNhanVien = s_NhanVien.TenNhanVien;
                nhanVien.AnhDaiDien = s_NhanVien.AnhDaiDien;
                nhanVien.Email = s_NhanVien.Email;
                nhanVien.GioiTinh = s_NhanVien.GioiTinh;
                nhanVien.NguyenQuan = s_NhanVien.NguyenQuan;
                nhanVien.SoCMT = s_NhanVien.SoCMT;
                nhanVien.NgayCap = s_NhanVien.NgayCap;
                nhanVien.NoiCap = s_NhanVien.NoiCap;
                nhanVien.SoDienThoai = s_NhanVien.SoDienThoai;
                nhanVien.Email = s_NhanVien.Email;
                try
                {
                    await db.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!S_NhanVienExists(s_NhanVien.NhanVienID))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }

                return Updated(s_NhanVien);
            }
        }

        // PATCH: odata/S_NhanVien(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public async Task<IHttpActionResult> Patch([FromODataUri] int key, Delta<S_NhanVien> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            S_NhanVien s_NhanVien = await db.S_NhanVien.FindAsync(key);
            if (s_NhanVien == null)
            {
                return NotFound();
            }

            patch.Patch(s_NhanVien);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!S_NhanVienExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(s_NhanVien);
        }

        // DELETE: odata/S_NhanVien(5)
        public async Task<IHttpActionResult> Delete([FromODataUri] int key)
        {
            S_NhanVien s_NhanVien = await db.S_NhanVien.FindAsync(key);
            if (s_NhanVien == null)
            {
                return NotFound();
            }

            db.S_NhanVien.Remove(s_NhanVien);
            await db.SaveChangesAsync();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/S_NhanVien(5)/S_Users
        [EnableQuery]
        public SingleResult<S_Users> GetS_Users([FromODataUri] int key)
        {
            return SingleResult.Create(db.S_NhanVien.Where(m => m.NhanVienID == key).Select(m => m.S_Users));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool S_NhanVienExists(int key)
        {
            return db.S_NhanVien.Count(e => e.NhanVienID == key) > 0;
        }
    }
}
