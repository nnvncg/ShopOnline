using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ShopAuto.Models;
namespace ShopAuto.Controllers
{
    public class InfomationController : Controller
    {
        readonly ShopOnlineEntities _db=new ShopOnlineEntities();
        //
        // GET: /Infomation/
        public ActionResult Header()
        {
            return View(_db.ShopInformations.Take(1).ToList());
        }
        public ActionResult BodyResult()
        {
            return View(_db.ShopInformations.Take(1).ToList());
        }
        public ActionResult FooterResult()
        {
            return View(_db.ShopInformations.Take(1).ToList());
        }
        public ActionResult TitleResult()
        {
            return View(_db.ShopInformations.Take(1).ToList());
        }
    }
}