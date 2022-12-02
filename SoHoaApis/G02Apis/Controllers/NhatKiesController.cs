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
    builder.EntitySet<NhatKy>("NhatKies");
    builder.EntitySet<S_VanBan>("S_VanBan"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class NhatKiesController : ODataController
    {
        private SoHoaEntities db = new SoHoaEntities();

        // GET: odata/NhatKies
        [EnableQuery]
        public IQueryable<NhatKy> GetNhatKies()
        {
            return db.NhatKies;
        }

        // GET: odata/NhatKies(5)
        [EnableQuery]
        public SingleResult<NhatKy> GetNhatKy([FromODataUri] int key)
        {
            return SingleResult.Create(db.NhatKies.Where(nhatKy => nhatKy.NhatKyId == key));
        }

        // PUT: odata/NhatKies(5)
        public async Task<IHttpActionResult> Put([FromODataUri] int key, Delta<NhatKy> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            NhatKy nhatKy = await db.NhatKies.FindAsync(key);
            if (nhatKy == null)
            {
                return NotFound();
            }

            patch.Put(nhatKy);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NhatKyExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(nhatKy);
        }

        // POST: odata/NhatKies
        public async Task<IHttpActionResult> Post(NhatKy nhatKy)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.NhatKies.Add(nhatKy);
            await db.SaveChangesAsync();

            return Created(nhatKy);
        }

        // PATCH: odata/NhatKies(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public async Task<IHttpActionResult> Patch([FromODataUri] int key, Delta<NhatKy> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            NhatKy nhatKy = await db.NhatKies.FindAsync(key);
            if (nhatKy == null)
            {
                return NotFound();
            }

            patch.Patch(nhatKy);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NhatKyExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(nhatKy);
        }

        // DELETE: odata/NhatKies(5)
        public async Task<IHttpActionResult> Delete([FromODataUri] int key)
        {
            NhatKy nhatKy = await db.NhatKies.FindAsync(key);
            if (nhatKy == null)
            {
                return NotFound();
            }

            db.NhatKies.Remove(nhatKy);
            await db.SaveChangesAsync();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/NhatKies(5)/S_VanBan
        [EnableQuery]
        public SingleResult<S_VanBan> GetS_VanBan([FromODataUri] int key)
        {
            return SingleResult.Create(db.NhatKies.Where(m => m.NhatKyId == key).Select(m => m.S_VanBan));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool NhatKyExists(int key)
        {
            return db.NhatKies.Count(e => e.NhatKyId == key) > 0;
        }
    }
}
