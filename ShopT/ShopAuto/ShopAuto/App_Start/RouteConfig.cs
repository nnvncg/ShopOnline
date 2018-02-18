using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
namespace ShopAuto
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                "Trang Quản Lý",
                "AdminLogin",
                new { controller = "AccountAdmin", action = "Login", id = "" }
            );
            routes.MapRoute(
               "Danh sách sản phẩm",
               "Products",
               new { controller = "Product", action = "AllProduct", id = "" }
            );
            routes.MapRoute(
               "Sử lý đặt hàng",
               "PayOrder",
               new { controller = "Order", action = "PayOrder", id = "" }
            );
            //mặc dịnh
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
            
            routes.MapRoute(
                name: "Trang Chủ",
                url: "Home",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "Liên hệ",
                url: "Contact",
                defaults: new { controller = "Contact", action = "Index", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "Đơn hàng",
                url: "Order",
                defaults: new { controller = "Order", action = "Index", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "Tài khoản",
                url: "Accounts",
                defaults: new { controller = "Accounts", action = "AccountInformation", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "Tìm kiếm",
                url: "Search",
                defaults: new { controller = "Find", action = "Search", id = UrlParameter.Optional }
            );
            
        }
    }
}
