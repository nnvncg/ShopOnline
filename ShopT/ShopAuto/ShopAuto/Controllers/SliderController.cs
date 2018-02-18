using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ShopAuto.Models;
namespace ShopAuto.Controllers
{
    public class SliderController : Controller
    {
        ShopOnlineEntities _db = null;
        //
        // GET: /Slider/
        public ActionResult Index()
        {
            _db = new ShopOnlineEntities();
            return View(_db.Sliders.Where(n => n.Active==true).Take(4).OrderByDescending(n => n.DateCreate).ToList());
        }
	}
}