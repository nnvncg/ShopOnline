using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ShopAuto.Models;
namespace ShopAuto.Controllers
{
    public class CategoryController : Controller
    {
        ShopOnlineEntities _db = null;
        //
        // GET: /Category/
        public ActionResult Index()
        {
            _db = new ShopOnlineEntities();
            return View(_db.Categories.ToList());
        }
	}
}