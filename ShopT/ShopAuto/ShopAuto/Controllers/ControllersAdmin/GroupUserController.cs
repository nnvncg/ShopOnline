using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ShopAuto.Models;
namespace ShopAuto.Controllers.ControllersAdmin
{
    public class GroupUserController : Controller
    {
        ShopOnlineEntities _db = new ShopOnlineEntities();
        // GET: GroupUser
        public ActionResult UserGroup()
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
                if (_gr.Authorities.Contains("-26-") || _gr.Authorities.Contains("-1-"))
                {
                    return View();
                }
                return Redirect("~/Page/404/index.html");

            }
        }
        [HttpPost]
        public JsonResult checkAuthorities(string Authorities)
        {    
            if (Session["IDAccAdmin"] != null)
            {
                int id =Convert.ToInt32(Session["IDAccAdmin"]);
                int grId = _db.Users.FirstOrDefault(n => n.ID == id).TypeAcc;
                var lstAut = _db.UserGroups.FirstOrDefault(n=>n.ID== grId).Authorities.Split('-');
                foreach (string item in lstAut)
                {
                    item.ToString();
                    if (item == "1" || item == Authorities)
                    {
                        return Json(true, JsonRequestBehavior.AllowGet);
                    }
                }
            }
            else
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
            return Json(false, JsonRequestBehavior.AllowGet);
        }
        public JsonResult AllGroup()
        {
            return Json(_db.UserGroups.Where(n=>n.Active==true).ToList(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult AllGroup1()
        {
            return Json(_db.UserGroups.ToList(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GroupByID(int id)
        {
            return Json(_db.UserGroups.FirstOrDefault(n=>n.ID==id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int id)
        {
            try
            {
                var type = _db.UserGroups.FirstOrDefault(n => n.ID == id);
                _db.UserGroups.Remove(type);
                _db.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);

            }
        }
        public JsonResult ChangeType(int Id)
        {
            try
            {
                var group = _db.UserGroups.FirstOrDefault(n => n.ID == Id);
                group.Active = !group.Active;
                _db.Entry(group).State= System.Data.Entity.EntityState.Modified;
                _db.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json(true, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult ListAuthorities()
        {
            return Json(_db.Decentralizations.ToList(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult CheckAuthorities(int id)
        {
            var authorities = _db.UserGroups.FirstOrDefault(n => n.ID == id).Authorities;
            var lstAuthorities=authorities.Split('-');
            int[] lst = new int[lstAuthorities.Length];
            int i = 0;
            foreach(string item in lstAuthorities)
            {
                if (item != "")
                {
                    lst[i] = Convert.ToInt32(item);
                    i++;
                }
            }
            return Json(lst, JsonRequestBehavior.AllowGet);
        }
        public JsonResult NewType(string name,int[] list)
        {
            string lst = "";
            foreach(int item in list)
            {
                lst = lst + '-' + item;
            }
            try
            {
                var group = new UserGroup();
                group.Active = true;
                group.NameType = name;
                group.CreateDate = DateTime.Now;
                group.Authorities = lst;
                group.Creator = Convert.ToInt32(Session["IDAccAdmin"]);
                _db.UserGroups.Add(group);
                _db.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json(true, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult EditType(int id,string name, int[] authorities)
        {
            string lst = "";
            foreach (int item in authorities)
            {
                lst = lst + '-' + item + '-';
            }
            try
            {
                var group = _db.UserGroups.FirstOrDefault(n=>n.ID==id);
                group.NameType = name;
                group.CreateDate = DateTime.Now;
                group.Authorities = lst;
                group.Creator = Convert.ToInt32(Session["IDAccAdmin"]);
                _db.Entry(group).State = System.Data.Entity.EntityState.Modified;
                _db.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json(true, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult ChangeName(int Id,string name)
        {
            try
            {
                var group = _db.UserGroups.FirstOrDefault(n => n.ID == Id);
                group.NameType = name;
                _db.Entry(group).State = System.Data.Entity.EntityState.Modified;
                _db.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json(true, JsonRequestBehavior.AllowGet);
            }
        }
    }
}