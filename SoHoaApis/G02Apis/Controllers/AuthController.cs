using G02Apis.Models;
using Hvit.Security;
using KinhBacP01APIs_NetStandard.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Mvc;
using System.Data.Entity;
using Newtonsoft.Json.Linq;

namespace G02Apis.Controllers
{
    [RoutePrefix("api/auth")]
    public class AuthController : Controller
    {
        public class LoginForm
        {
            public string Username { get; set; }
            public string Password { get; set; }
            public string RePassword { get; set; }
            public string ChangePasswordKey { get; set; }
            public string OldPassword { get; set; }
        }

        public class UserModel
        {
            public S_Users User { get; set; }
            public List<int> Groups { get; set; }

            public UserModel()
            {
                Groups = new List<int>();
            }
        }

        [AllowCrossSiteJson]
        [HttpPost]
        [Route("login")]
        public JsonResult Login(LoginForm login)
        {
            using (SoHoaEntities db = new SoHoaEntities())
            {
                S_Users user = db.S_Users.SingleOrDefault(x => x.UserName == login.Username);
                if (user != null)
                {
                    string passwordSalt = user.PasswordSalt;
                    string passwordInput = AuthenticationHelper.GetMd5Hash(passwordSalt + login.Password);
                    string passwordUser = user.Password;

                    if (passwordInput.Equals(passwordUser))
                    {
                        TokenProvider tokenProvider = new TokenProvider();
                        TokenIdentity token = tokenProvider.GenerateToken(login.Username,
                            Request.Headers["User-Agent"].ToString(),
                            HttpContext.Request.UserHostAddress, Guid.NewGuid().ToString(),
                            DateTime.Now.AddHours(7).Ticks);
                        token.SetAuthenticationType("Custom");
                        token.SetIsAuthenticated(true);
                        db.AccessTokens.Add(new AccessToken()
                        {
                            Token = token.Token,
                            EffectiveTime = new DateTime(token.EffectiveTime),
                            ExpiresIn = token.ExpiresTime,
                            IP = token.IP,
                            UserAgent = token.UserAgent,
                            UserName = token.Name
                        });
                        db.SaveChanges();

                        return Json(
                            new
                            {
                                Token = token,
                                Profile = new
                                {
                                    Username = token.UserName,
                                    FullName = user.UserName,
                                },
                                User = new
                                {
                                    UserName = user.UserName,
                                    UserId = user.UserID
                                }
                            });
                    }
                }
            }
            return Json("Login failed!");
        }

        [AllowCrossSiteJson]
        [AuthQueryable]
        [HttpGet]
        [Route("validate-token")]
        public JsonResult ValidateToken()
        {
            return Json("Ok", JsonRequestBehavior.AllowGet);
        }
        [AllowCrossSiteJson]
        [AuthQueryable]
        [HttpGet]
        public JsonResult ValidateTokenUser()
        {
            string token = null;
            if (Request.Headers.AllKeys.Contains("access_token"))
            {
                token = Request.Headers.GetValues("access_token").FirstOrDefault();
            }
            using (SoHoaEntities db = new SoHoaEntities())
            {
                AccessToken accessToken = db.AccessTokens.FirstOrDefault(x => x.Token.Equals(token));
                S_Users user = db.S_Users.FirstOrDefault(x => x.UserName.Equals(accessToken.UserName));
                if (user != null)
                {
                    return Json(
                            new
                            {
                                User = new
                                {
                                    UserId = user.UserID,
                                    UserName = user.UserName,
                                }
                            }, JsonRequestBehavior.AllowGet);
                }
            }
         return Json("Error", JsonRequestBehavior.AllowGet);
        }
    }
    public class AllowCrossSiteJsonAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            filterContext.RequestContext.HttpContext.Response.AddHeader("Access-Control-Allow-Origin", "*");
            base.OnActionExecuting(filterContext);
        }
    }
}
