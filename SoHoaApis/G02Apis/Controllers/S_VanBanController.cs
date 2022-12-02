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
    builder.EntitySet<S_VanBan>("S_VanBan");
    builder.EntitySet<CommonStatu>("CommonStatus"); 
    builder.EntitySet<NgonNgu>("NgonNgus"); 
    builder.EntitySet<S_ComputerFile>("S_ComputerFile"); 
    builder.EntitySet<S_HoSo>("S_HoSo"); 
    builder.EntitySet<S_LoaiVanBan>("S_LoaiVanBan"); 
    builder.EntitySet<S_MucDoTinCay>("S_MucDoTinCay"); 
    builder.EntitySet<S_TinhTrangVatLy>("S_TinhTrangVatLy"); 
    builder.EntitySet<NhatKy>("NhatKies"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class S_VanBanController : ODataController
    {
        private SoHoaEntities db = new SoHoaEntities();

        // GET: odata/S_VanBan
        [EnableQuery]
        public IQueryable<S_VanBan> GetS_VanBan()
        {
            return db.S_VanBan;
        }

        // GET: odata/S_VanBan(5)
        [EnableQuery]
        public SingleResult<S_VanBan> GetS_VanBan([FromODataUri] int key)
        {
            return SingleResult.Create(db.S_VanBan.Where(s_VanBan => s_VanBan.VanBanID == key));
        }

        // PUT: odata/S_VanBan(5)
        public async Task<IHttpActionResult> Put([FromODataUri] int key, Delta<S_VanBan> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            S_VanBan s_VanBan = await db.S_VanBan.FindAsync(key);
            if (s_VanBan == null)
            {
                return NotFound();
            }

            patch.Put(s_VanBan);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!S_VanBanExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(s_VanBan);
        }

        // POST: odata/S_VanBan
        public async Task<IHttpActionResult> Post(S_VanBan s_VanBan)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.S_VanBan.Add(s_VanBan);
            await db.SaveChangesAsync();

            return Created(s_VanBan);
        }

        // PATCH: odata/S_VanBan(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public async Task<IHttpActionResult> Patch([FromODataUri] int key, Delta<S_VanBan> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            S_VanBan s_VanBan = await db.S_VanBan.FindAsync(key);
            if (s_VanBan == null)
            {
                return NotFound();
            }

            patch.Patch(s_VanBan);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!S_VanBanExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(s_VanBan);
        }

        // DELETE: odata/S_VanBan(5)
        public async Task<IHttpActionResult> Delete([FromODataUri] int key)
        {
            S_VanBan s_VanBan = await db.S_VanBan.FindAsync(key);
            if (s_VanBan == null)
            {
                return NotFound();
            }

            db.S_VanBan.Remove(s_VanBan);
            await db.SaveChangesAsync();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/S_VanBan(5)/CommonStatu
        [EnableQuery]
        public SingleResult<CommonStatu> GetCommonStatu([FromODataUri] int key)
        {
            return SingleResult.Create(db.S_VanBan.Where(m => m.VanBanID == key).Select(m => m.CommonStatu));
        }

        // GET: odata/S_VanBan(5)/NgonNgu
        [EnableQuery]
        public SingleResult<NgonNgu> GetNgonNgu([FromODataUri] int key)
        {
            return SingleResult.Create(db.S_VanBan.Where(m => m.VanBanID == key).Select(m => m.NgonNgu));
        }

        // GET: odata/S_VanBan(5)/S_ComputerFile
        [EnableQuery]
        public SingleResult<S_ComputerFile> GetS_ComputerFile([FromODataUri] int key)
        {
            return SingleResult.Create(db.S_VanBan.Where(m => m.VanBanID == key).Select(m => m.S_ComputerFile));
        }

        // GET: odata/S_VanBan(5)/S_HoSo
        [EnableQuery]
        public SingleResult<S_HoSo> GetS_HoSo([FromODataUri] int key)
        {
            return SingleResult.Create(db.S_VanBan.Where(m => m.VanBanID == key).Select(m => m.S_HoSo));
        }

        // GET: odata/S_VanBan(5)/S_LoaiVanBan
        [EnableQuery]
        public SingleResult<S_LoaiVanBan> GetS_LoaiVanBan([FromODataUri] int key)
        {
            return SingleResult.Create(db.S_VanBan.Where(m => m.VanBanID == key).Select(m => m.S_LoaiVanBan));
        }

        // GET: odata/S_VanBan(5)/S_MucDoTinCay
        [EnableQuery]
        public SingleResult<S_MucDoTinCay> GetS_MucDoTinCay([FromODataUri] int key)
        {
            return SingleResult.Create(db.S_VanBan.Where(m => m.VanBanID == key).Select(m => m.S_MucDoTinCay));
        }

        // GET: odata/S_VanBan(5)/S_TinhTrangVatLy
        [EnableQuery]
        public SingleResult<S_TinhTrangVatLy> GetS_TinhTrangVatLy([FromODataUri] int key)
        {
            return SingleResult.Create(db.S_VanBan.Where(m => m.VanBanID == key).Select(m => m.S_TinhTrangVatLy));
        }

        // GET: odata/S_VanBan(5)/NhatKies
        [EnableQuery]
        public IQueryable<NhatKy> GetNhatKies([FromODataUri] int key)
        {
            return db.S_VanBan.Where(m => m.VanBanID == key).SelectMany(m => m.NhatKies);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool S_VanBanExists(int key)
        {
            return db.S_VanBan.Count(e => e.VanBanID == key) > 0;
        }
    }
}
