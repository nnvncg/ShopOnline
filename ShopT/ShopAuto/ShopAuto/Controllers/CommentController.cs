using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ShopAuto.Models;
namespace ShopAuto.Controllers
{
    public class CommentController : Controller
    {
        ShopOnlineEntities _db = new ShopOnlineEntities();
        // GET: Comment
        public ActionResult Index()
        {
            return View();
        }
        public PartialViewResult FindComment(string _idProduct)
        {
            int _product = Convert.ToInt32(_idProduct);
            ViewBag.ProductId = _idProduct;
            var query = _db.Comments.Where(n => n.Product == _product).OrderByDescending(n => n.CreateDate).ToList();
            return PartialView(query);
        }
        public JsonResult FindComment2(string id)
        {
            int i = Convert.ToInt32(id);
            var query = _db.Comments.Where(n => n.Product == i).OrderByDescending(n=>n.CreateDate).ToList();
            return Json(query, JsonRequestBehavior.AllowGet);
        }
        public JsonResult AddComment(int idProd, string comment)
        {
            try
            {
                Comment cm = new Comment();
                cm.Product = idProd;
                cm.Comment1 = comment;
                cm.Creator = Convert.ToInt32(Session["IdCus"]);
                cm.CreateDate = DateTime.Now;
                cm.Seem = false;
                _db.Comments.Add(cm);
                _db.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }


        }
        public PartialViewResult CommentByProduct(string id)
        {
            System.Threading.Thread.Sleep(3000);
            int i = Convert.ToInt32(id);
            return PartialView(_db.Comments.Where(n => n.Product == i).ToList());
        }
    }
}