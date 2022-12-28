using G02Apis.Models;
using Newtonsoft.Json.Serialization;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.OData.Builder;
using System.Web.Http.OData.Extensions;

namespace G02Apis
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {

            // Web API routes
            config.MapHttpAttributeRoutes();
            var cors = new EnableCorsAttribute(
                "*",
                "*",
                "*"
            );
            config.EnableCors(cors);

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
            config.Formatters.JsonFormatter.SupportedMediaTypes
            .Add(new MediaTypeHeaderValue("text/html"));

            ODataConventionModelBuilder builder = new ODataConventionModelBuilder();
            builder.EntitySet<S_Authority>("S_Authority");
            builder.EntitySet<S_ComputerFile>("S_ComputerFile");
            builder.EntitySet<S_CoQuan>("S_CoQuan");
            builder.EntitySet<S_HopSo>("S_HopSo");
            builder.EntitySet<S_HoSo>("S_HoSo");
            builder.EntitySet<S_Kho>("S_Kho");
            builder.EntitySet<S_LoaiCoQuan>("S_LoaiCoQuan");
            builder.EntitySet<S_LoaiHoSo>("S_LoaiHoSo");
            builder.EntitySet<S_LoaiVanBan>("S_LoaiVanBan");
            builder.EntitySet<S_LuuTru>("S_LuuTru");
            builder.EntitySet<S_Menu>("S_Menu");
            builder.EntitySet<AccessToken>("AccessToken");
            builder.EntitySet<S_MucDoTinCay>("S_MucDoTinCay");
            builder.EntitySet<S_MucLucHoSo>("S_MucLucHoSo");
            builder.EntitySet<S_NhanVien>("S_NhanVien");
            builder.EntitySet<S_Page>("S_Page");
            builder.EntitySet<S_Phong>("S_Phong");
            builder.EntitySet<S_Role>("S_Role");
            builder.EntitySet<S_Role_URL>("S_Role_URL");
            builder.EntitySet<S_TinhTrangVatLy>("S_TinhTrangVatLy");
            builder.EntitySet<S_Uers_Atuthority>("S_Uers_Atuthority");
            builder.EntitySet<S_User_Role>("S_User_Role");
            builder.EntitySet<S_VanBan>("S_VanBan");
            builder.EntitySet<DiaChi>("DiaChi");
            builder.EntitySet<DigitalSignature>("DigitalSignature");
            builder.EntitySet<Huyen>("Huyen");
            builder.EntitySet<Tinh>("Tinh");
            builder.EntitySet<XaPhuong>("XaPhuong");
            builder.EntitySet<CommonStatu>("CommonStatus");
            builder.EntitySet<NgonNgu>("NgonNgus");
            builder.EntitySet<S_MucDoTinCay>("S_MucDoTinCay");
            builder.EntitySet<NhatKy>("NhatKies");
            builder.EntitySet<S_Users>("S_Users");
            config.Routes.MapODataServiceRoute("odata", "odata", builder.GetEdmModel());


            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            config.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling
                = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
        }
    }
}

