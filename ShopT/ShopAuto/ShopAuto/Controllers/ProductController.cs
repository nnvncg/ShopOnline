using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ShopAuto.Models;
using PagedList;
using PagedList.Mvc;
namespace ShopAuto.Controllers
{
    public class ProductController : Controller
    {
        ShopOnlineEntities _db = null;
        //
        // GET: /Product/
        public ActionResult Product()
        {
            _db = new ShopOnlineEntities();
            return View(_db.Products.OrderByDescending(n=>n.CreateDate).Take(6).ToList());
        }
        public ActionResult ProductHot()
        {
            
            return View();
        }

        [Route("Product/{page}")]
        public ActionResult AllProduct()
        {
           
            return View();
        }
        public JsonResult ProductAll()
        {
            _db = new ShopOnlineEntities();
            return Json(_db.Products.Where(n => n.Active == true).ToList(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult ProductNew()
        {
            _db = new ShopOnlineEntities();
            return Json(_db.Products.Where(n=>n.Active==true).OrderByDescending(n => n.CreateDate).Take(6).ToList(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult TopHot()
        {
            _db = new ShopOnlineEntities();
            return Json(_db.Products.Where(n => n.Active == true).OrderByDescending(n => n.CountOrder).Take(6).ToList(), JsonRequestBehavior.AllowGet);
        }

    }
}