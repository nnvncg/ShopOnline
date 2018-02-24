using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ShopAuto.Models;

namespace ShopAuto.Controllers.ControllersAdmin
{
    public class CommentAdminController : Controller
    {
        ShopOnlineEntities _db = new ShopOnlineEntities();
        // GET: CommentAdmin
        public ActionResult Comment()
        {
            if (Session["EmailAdmin"] == null)
            {
                return Redirect("/AccountAdmin/Login");
            }
            else
            {
                int _id = Convert.ToInt32(Session["IDAccAdmin"].ToString());
                int _userType = _db.Users.FirstOrDefault(n => n.ID == _id).TypeAcc;
                UserGroup _gr = _db.UserGroups.FirstOrDefault(n => n.ID == _userType);
                if (_gr.Authorities.Contains("-12-")|| _gr.Authorities.Contains("-1-"))
                {
                    return View();
                }
                return Redirect("~/Page/404/index.html");

            }
        }
        public JsonResult Seem()
        {            
            return Json(_db.Comments.Where(n=>n.Seem==false).OrderByDescending(n => n.CreateDate).ToList(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult All()
        {
            return Json(_db.Comments.OrderByDescending(n => n.CreateDate).ToList(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult CommentByProd(int idProd)
        {
            return Json(_db.Comments.Where(n=>n.Product== idProd).OrderByDescending(n=>n.CreateDate).ToList(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult NewCmt(int idProd,string cmt)
        {
            var comment = new Comment();
            try
            {
                comment.Product = idProd;
                comment.Comment1 = cmt;
                comment.CreateDate = DateTime.Now;
                comment.Creator = 1;
                _db.Comments.Add(comment);
                _db.SaveChanges();
                return Json(comment.Product, JsonRequestBehavior.AllowGet);
            }
            catch
            {

                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult UpdateView(int id)
        {
            var cmt = _db.Comments.FirstOrDefault(n => n.ID == id);
            if (cmt.Seem==false)
            {
                cmt.Seem = true;
                _db.Entry(cmt).State = System.Data.Entity.EntityState.Modified;
                _db.SaveChanges();
            }
            return Json(cmt.Product, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int id)
        {
            try
            {
                var cmt = _db.Comments.FirstOrDefault(n => n.ID == id);               
                _db.Comments.Remove(cmt);
                _db.SaveChanges();
                return Json(cmt.Product, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
            
        }
        public JsonResult InDate()
        {
            var a = DateTime.Now;
            var b = new List<Comment>();
            var comm = _db.Comments.ToList();
            foreach(var item in comm)
            {
                if (item.CreateDate.Date == a.Date)
                {
                    b.Add(item);
                }
            }
            return Json(b.OrderByDescending(n=>n.CreateDate), JsonRequestBehavior.AllowGet);
        }
        public JsonResult InWeek()
        {
            var a = DateTime.Now.DayOfWeek;
            var b = new List<Comment>();
            var comm = _db.Comments.ToList();
            foreach (var item in comm)
            {
                if (item.CreateDate.DayOfWeek == a)
                {
                    b.Add(item);
                }
            }
            return Json(b.OrderByDescending(n => n.CreateDate), JsonRequestBehavior.AllowGet);
        }
        public JsonResult InMonth()
        {
            var a = DateTime.Now;
            var b = new List<Comment>();
            var comm = _db.Comments.ToList();
            foreach (var item in comm)
            {
                if (item.CreateDate.Month==a.Month&& item.CreateDate.Year==a.Year)
                {
                    b.Add(item);
                }
            }
            return Json(b.OrderByDescending(n => n.CreateDate), JsonRequestBehavior.AllowGet);
        }
    }
}