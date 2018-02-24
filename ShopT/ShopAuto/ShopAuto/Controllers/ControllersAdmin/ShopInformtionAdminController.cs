using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ShopAuto.Models;
namespace ShopAuto.Controllers.ControllersAdmin
{
    public class ShopInformtionAdminController : Controller
    {
        ShopOnlineEntities _db = new ShopOnlineEntities();
        // GET: ShopInformtionAdmin
        public ActionResult Information()
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
                if (_gr.Authorities.Contains("-17-") || _gr.Authorities.Contains("-1-"))
                {
                    return View();
                }
                return Redirect("~/Page/404/index.html");

            }
        }
        public ActionResult MapGoogle()
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
                if (_gr.Authorities.Contains("-17-") || _gr.Authorities.Contains("-1-"))
                {
                    return View();
                }
                return Redirect("~/Page/404/index.html");

            }
        }
        public ActionResult MetaKey()
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
                if (_gr.Authorities.Contains("-17-") || _gr.Authorities.Contains("-1-"))
                {
                    return View();
                }
                return Redirect("~/Page/404/index.html");

            }
        }
        public JsonResult DataInformation()
        {
            ShopInformation data = _db.ShopInformations.FirstOrDefault(n=>n.ID==1);
            return Json(data, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [ValidateInput(false)]
        public JsonResult Edit1(HttpPostedFileBase aFile,string name,string address, string about)
        {
            ShopInformation data = _db.ShopInformations.FirstOrDefault(n => n.ID == 1);
            FileInfo fileImg = new FileInfo(Server.MapPath("~" + data.IconShop));
            if (aFile != null)
            {
                string file = aFile.FileName;
                if (!file.Contains(".ico")){
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
                string path = Server.MapPath("~/Content/img/MonAn/KhuyenMai-Sukien/");
                var ac = Guid.NewGuid() + "." + file.Split('.')[1];
                aFile.SaveAs(path + ac);
                if (fileImg.Exists)
                {
                    fileImg.Delete();
                }
                if (data != null)
                {
                    _db.Entry(data).State = System.Data.Entity.EntityState.Detached;
                }
                data.IconShop = "/Content/img/MonAn/KhuyenMai-Sukien/" + ac;
            }
            data.NameShop = name;
            data.AddressShop = address;
            data.About = about;
            _db.Entry(data).State = System.Data.Entity.EntityState.Modified;
            _db.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Edit2(string phone, string phone2, string email,string bankAcc,string password)
        {
            ShopInformation data = _db.ShopInformations.FirstOrDefault(n => n.ID == 1);
            data.Phone = phone;
            data.Phone2= phone;
            data.Email= email;
            data.PassWordEmail = password;
            data.BankAcc= bankAcc;
            _db.Entry(data).State = System.Data.Entity.EntityState.Modified;
            _db.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Edit3(string facebook, string google, string zalo)
        {
            ShopInformation data = _db.ShopInformations.FirstOrDefault(n => n.ID == 1);
            data.FaceBook= facebook;
            data.Google= google;
            data.Zalo= zalo;
            _db.Entry(data).State = System.Data.Entity.EntityState.Modified;
            _db.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Edit4( string map)
        {
            ShopInformation data = _db.ShopInformations.FirstOrDefault(n => n.ID == 1);
            data.URLMap = map;
            _db.Entry(data).State = System.Data.Entity.EntityState.Modified;
            _db.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Edit5(string keyword)
        {
            ShopInformation data = _db.ShopInformations.FirstOrDefault(n => n.ID == 1);
            data.Keywords = keyword;
            _db.Entry(data).State = System.Data.Entity.EntityState.Modified;
            _db.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }
    }
}