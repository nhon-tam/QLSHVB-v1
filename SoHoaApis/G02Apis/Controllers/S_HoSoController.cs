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
    builder.EntitySet<S_HoSo>("S_HoSo");
    builder.EntitySet<S_ComputerFile>("S_ComputerFile"); 
    builder.EntitySet<S_HopSo>("S_HopSo"); 
    builder.EntitySet<S_LoaiHoSo>("S_LoaiHoSo"); 
    builder.EntitySet<S_VanBan>("S_VanBan"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class S_HoSoController : ODataController
    {
        private SoHoaEntities db = new SoHoaEntities();

        // GET: odata/S_HoSo
        [EnableQuery]
        public IQueryable<S_HoSo> GetS_HoSo()
        {
            return db.S_HoSo;
        }

        // GET: odata/S_HoSo(5)
        [EnableQuery]
        public SingleResult<S_HoSo> GetS_HoSo([FromODataUri] int key)
        {
            return SingleResult.Create(db.S_HoSo.Where(s_HoSo => s_HoSo.HoSoID == key));
        }

        // PUT: odata/S_HoSo(5)
        public async Task<IHttpActionResult> Put([FromODataUri] int key, Delta<S_HoSo> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            S_HoSo s_HoSo = await db.S_HoSo.FindAsync(key);
            if (s_HoSo == null)
            {
                return NotFound();
            }

            patch.Put(s_HoSo);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!S_HoSoExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(s_HoSo);
        }

        // POST: odata/S_HoSo
        public async Task<IHttpActionResult> Post(S_HoSo s_HoSo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.S_HoSo.Add(s_HoSo);
            await db.SaveChangesAsync();

            return Created(s_HoSo);
        }

        // PATCH: odata/S_HoSo(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public async Task<IHttpActionResult> Patch([FromODataUri] int key, Delta<S_HoSo> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            S_HoSo s_HoSo = await db.S_HoSo.FindAsync(key);
            if (s_HoSo == null)
            {
                return NotFound();
            }

            patch.Patch(s_HoSo);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!S_HoSoExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(s_HoSo);
        }

        // DELETE: odata/S_HoSo(5)
        public async Task<IHttpActionResult> Delete([FromODataUri] int key)
        {
            S_HoSo s_HoSo = await db.S_HoSo.FindAsync(key);
            if (s_HoSo == null)
            {
                return NotFound();
            }

            db.S_HoSo.Remove(s_HoSo);
            await db.SaveChangesAsync();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/S_HoSo(5)/S_ComputerFile
        [EnableQuery]
        public IQueryable<S_ComputerFile> GetS_ComputerFile([FromODataUri] int key)
        {
            return db.S_HoSo.Where(m => m.HoSoID == key).SelectMany(m => m.S_ComputerFile);
        }

        // GET: odata/S_HoSo(5)/S_HopSo
        [EnableQuery]
        public SingleResult<S_HopSo> GetS_HopSo([FromODataUri] int key)
        {
            return SingleResult.Create(db.S_HoSo.Where(m => m.HoSoID == key).Select(m => m.S_HopSo));
        }

        // GET: odata/S_HoSo(5)/S_LoaiHoSo
        [EnableQuery]
        public SingleResult<S_LoaiHoSo> GetS_LoaiHoSo([FromODataUri] int key)
        {
            return SingleResult.Create(db.S_HoSo.Where(m => m.HoSoID == key).Select(m => m.S_LoaiHoSo));
        }

        // GET: odata/S_HoSo(5)/S_VanBan
        [EnableQuery]
        public IQueryable<S_VanBan> GetS_VanBan([FromODataUri] int key)
        {
            return db.S_HoSo.Where(m => m.HoSoID == key).SelectMany(m => m.S_VanBan);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool S_HoSoExists(int key)
        {
            return db.S_HoSo.Count(e => e.HoSoID == key) > 0;
        }
    }
}
