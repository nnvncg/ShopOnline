using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ShopAuto.Models;
namespace ShopAuto.Controllers.ControllersAdmin
{
    public class MenuAdminController : Controller
    {
        // GET: MenuAdmin
        private ShopOnlineEntities _db = new ShopOnlineEntities();
        public ActionResult Index()
        {
            if (Session["EmailAdmin"] == null)
            {
                return Redirect("/AccountAdmin/Login");
            }
            else
            {
                return View();
            }
        }
        public JsonResult ListMenu()
        {
            List<MenuList> lstMenu = _db.MenuLists.OrderBy(n => n.Order).ToList();
            return Json(lstMenu, JsonRequestBehavior.AllowGet);
        }
        public JsonResult DeleteMenu(string idMenu)
        {
            int _id = Convert.ToInt32(idMenu);
            MenuList menu = _db.MenuLists.FirstOrDefault(n => n.ID == _id);
            string name = menu.MenuName;
            _db.MenuLists.Remove(menu);
            _db.SaveChanges();
            return Json(name, JsonRequestBehavior.AllowGet);
        }
        public JsonResult MenuById(string idMenu)
        {
            int _id = Convert.ToInt32(idMenu);
            MenuList menu = _db.MenuLists.FirstOrDefault(n => n.ID == _id);
            return Json(menu, JsonRequestBehavior.AllowGet);
        }
        public JsonResult MenuAdd([Bind(Exclude = "ID")]MenuList ml)
        {
            //MenuList menu = new MenuList();
            var lsMenu = _db.MenuLists;
            if (lsMenu.Count() == 7)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
            else
            {
                if (ml.Order != null)
                {
                    check(Convert.ToInt32(ml.Order),true);
                }
                ml.CreateDate = DateTime.Now;
                ml.Creator = 1;
                try
                {
                    _db.MenuLists.Add(ml);
                    _db.SaveChanges();
                    return Json(true, JsonRequestBehavior.AllowGet);
                }
                catch
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
            }

        }
        public JsonResult MenuEdit(MenuList ml)
        {
            //MenuList menu = new MenuList();

            ml.CreateDate = DateTime.Now;
            ml.Creator = 1;
            try
            {
                if (ml.Order != null)
                {
                    check(Convert.ToInt32(ml.Order),false);
                }
                _db.Entry(ml).State = System.Data.Entity.EntityState.Modified;
                _db.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(true, JsonRequestBehavior.AllowGet);
            }
        }
        public void check(int order,bool type)
        {
            int i = type?1:0;            
            var lstAllMenu = _db.MenuLists.Where(n => n.Order >= order);
            foreach (var item in lstAllMenu)
            {
                item.Order = order + i;
                _db.Entry(item).State = System.Data.Entity.EntityState.Modified;
                i++;

            }
            _db.SaveChanges();
        }
    }
}