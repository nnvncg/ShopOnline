using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ShopAuto.Models;

namespace ShopAuto.Controllers.ControllersAdmin
{
    public class CategoryAdminController : Controller
    {
        ShopOnlineEntities _db = new ShopOnlineEntities();
        // GET: CategoryAdmin
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

        public JsonResult NameCategoryById(string id)
        {
            int _id = Convert.ToInt32(id);
            return Json(_db.Categories.FirstOrDefault(n => n.ID == _id && n.Active == true).NameCategory, JsonRequestBehavior.AllowGet);
        }
        public JsonResult CategoryById(int id)
        {
            return Json(_db.Categories.FirstOrDefault(n => n.ID == id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult CategoryAll()
        {
            return Json(_db.Categories.ToList(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Active(int id)
        {
            var cate = _db.Categories.FirstOrDefault(n => n.ID == id);
            cate.Active = !cate.Active;
            _db.Entry(cate).State = EntityState.Modified;
            _db.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Edit(Category category)
        {
            if (category != null)
            {
                _db.Entry(category).State = EntityState.Modified;
                _db.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            return Json(false, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(Category category)
        {
            if (category != null)
            {
                category.Active = true;
                category.Creator = 1;
                _db.Categories.Add(category);
                _db.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            return Json(false, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Remove(int id)
        {
            try
            {
                var cate = _db.Categories.FirstOrDefault(n => n.ID == id);
                _db.Categories.Remove(cate);
                _db.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }

        }
    }
}