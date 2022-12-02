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
    builder.EntitySet<S_Users>("S_Users");
    builder.EntitySet<S_NhanVien>("S_NhanVien"); 
    builder.EntitySet<S_Uers_Atuthority>("S_Uers_Atuthority"); 
    builder.EntitySet<S_User_Role>("S_User_Role"); 
    config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());
    */
    public class S_UsersController : ODataController
    {
        private SoHoaEntities db = new SoHoaEntities();

        // GET: odata/S_Users
        [EnableQuery]
        public IQueryable<S_Users> GetS_Users()
        {
            return db.S_Users;
        }

        // GET: odata/S_Users(5)
        [EnableQuery]
        public SingleResult<S_Users> GetS_Users([FromODataUri] int key)
        {
            return SingleResult.Create(db.S_Users.Where(s_Users => s_Users.UserID == key));
        }

        // PUT: odata/S_Users(5)
        public async Task<IHttpActionResult> Put([FromODataUri] int key, Delta<S_Users> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            S_Users s_Users = await db.S_Users.FindAsync(key);
            if (s_Users == null)
            {
                return NotFound();
            }

            patch.Put(s_Users);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!S_UsersExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(s_Users);
        }

        // POST: odata/S_Users
        public async Task<IHttpActionResult> Post(S_Users s_Users)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.S_Users.Add(s_Users);
            await db.SaveChangesAsync();

            return Created(s_Users);
        }

        // PATCH: odata/S_Users(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public async Task<IHttpActionResult> Patch([FromODataUri] int key, Delta<S_Users> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            S_Users s_Users = await db.S_Users.FindAsync(key);
            if (s_Users == null)
            {
                return NotFound();
            }

            patch.Patch(s_Users);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!S_UsersExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(s_Users);
        }

        // DELETE: odata/S_Users(5)
        public async Task<IHttpActionResult> Delete([FromODataUri] int key)
        {
            S_Users s_Users = await db.S_Users.FindAsync(key);
            if (s_Users == null)
            {
                return NotFound();
            }

            db.S_Users.Remove(s_Users);
            await db.SaveChangesAsync();

            return StatusCode(HttpStatusCode.NoContent);
        }

        // GET: odata/S_Users(5)/S_NhanVien
        [EnableQuery]
        public IQueryable<S_NhanVien> GetS_NhanVien([FromODataUri] int key)
        {
            return db.S_Users.Where(m => m.UserID == key).SelectMany(m => m.S_NhanVien);
        }

        // GET: odata/S_Users(5)/S_Uers_Atuthority
        [EnableQuery]
        public IQueryable<S_Uers_Atuthority> GetS_Uers_Atuthority([FromODataUri] int key)
        {
            return db.S_Users.Where(m => m.UserID == key).SelectMany(m => m.S_Uers_Atuthority);
        }

        // GET: odata/S_Users(5)/S_User_Role
        [EnableQuery]
        public IQueryable<S_User_Role> GetS_User_Role([FromODataUri] int key)
        {
            return db.S_Users.Where(m => m.UserID == key).SelectMany(m => m.S_User_Role);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool S_UsersExists(int key)
        {
            return db.S_Users.Count(e => e.UserID == key) > 0;
        }
    }
}
