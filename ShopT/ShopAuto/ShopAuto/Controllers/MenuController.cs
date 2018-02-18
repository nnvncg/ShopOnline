using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ShopAuto.Models;
namespace ShopAuto.Controllers
{
    public class MenuController : Controller
    {
        ShopOnlineEntities _db = null;        
        //
        // GET: /Menu/
        public PartialViewResult MenuListResult()
        {
            _db = new ShopOnlineEntities();
            return PartialView(_db.MenuLists.OrderBy(n=>n.Order).ToList());

        }
	}
}