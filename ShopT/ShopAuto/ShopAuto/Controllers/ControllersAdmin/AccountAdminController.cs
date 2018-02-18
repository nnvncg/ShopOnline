using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ShopAuto.Models;
using ShopAuto.Md5;
using System.Runtime.Serialization.Json;
using System.IO;
using System.Text;
using System.Web.Helpers;


namespace ShopAuto.Controllers.ControllersAdmin
{
    public class AccountAdminController : Controller
    {
        ShopOnlineEntities _db = new ShopOnlineEntities();
        // GET: AccountAdmin
        public ActionResult Account()
        {
            if (Session["EmailAdmin"] == null)
            {
                return Redirect("Login");
            }
            else
            {
                return View();
            }

        }
        public ActionResult Login()
        {
            if (Session["EmailAdmin"] != null)
            {
                return Redirect("Account");
            }
            return View();
        }
        public JsonResult LogInAdmin(string email, string pass)
        {
            var acc = _db.Users.FirstOrDefault(n => n.Email == email);
            if (acc.TypeAcc == 4)
            {
                return Json(1, JsonRequestBehavior.AllowGet);
            }
            if (acc.Active == false)
            {
                return Json(2, JsonRequestBehavior.AllowGet);
            }
            string pass1 = Md5.Encryptor.MD5Hash(pass);
            if (acc.Password.Contains(pass1))
            {
                Session["EmailAdmin"] = email;
                Session["IDAccAdmin"] = _db.UserGroups.FirstOrDefault(n => n.ID == acc.TypeAcc).ID;
                return Json(3, JsonRequestBehavior.AllowGet);
            }
            else
                return Json(4, JsonRequestBehavior.AllowGet);
        }
        public ActionResult LogOut()
        {
            Session.Remove("EmailAdmin");
            Session.Remove("IDAccAdmin");
            return Redirect("Login");
        }
        public JsonResult NameAccountById(string id)
        {
            int _id = Convert.ToInt32(id);
            User account = _db.Users.FirstOrDefault(n => n.ID == _id);
            string name = account.FirstName + " " + account.LastName;
            return Json(name, JsonRequestBehavior.AllowGet);
        }
        public JsonResult NameAccountCurrent()
        {
            if (Session["IDAccAdmin"] != null)
            {
                int _id = Convert.ToInt32(Session["IDAccAdmin"]);
                User account = _db.Users.FirstOrDefault(n => n.ID == _id);
                string name = account.FirstName + " " + account.LastName;
                return Json(name, JsonRequestBehavior.AllowGet);
            }
            return Json("", JsonRequestBehavior.AllowGet);

        }
        public JsonResult CheckPass(string pass)
        {
            var acc = _db.Users.FirstOrDefault(n => n.ID == 1);
            string pass1 = Md5.Encryptor.MD5Hash(pass);
            if (acc.Password.Contains(pass1))
            {
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            else
                return Json(false, JsonRequestBehavior.AllowGet);
        }
        public JsonResult AllAccount()
        {
            var account = _db.Users.ToList();
            return Json(account, JsonRequestBehavior.AllowGet);
        }
        public JsonResult CheckEmail(string email)
        {
            var acc = _db.Users.FirstOrDefault(n => n.Email == email);
            if (acc == null)
            {
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult NewAcc(User user)
        {
            try
            {
                user.CreateDate = DateTime.Now;
                user.Active = true;
                user.Image = "/Content/img/TaiKhoan/hinhdd.jpg";
                _db.Users.Add(user);
                _db.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult AccById(int id)
        {
            return Json(_db.Users.FirstOrDefault(n => n.ID == id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult ResetPass1(string email)
        {
            try
            {
                int Numrd;
                Random rd = new Random();
                Numrd = rd.Next(2222, 9999);
                var acc = _db.Users.FirstOrDefault(n => n.Email == email);
                //pass = Md5.Encryptor.MD5Hash(pass);
                //acc.Password = pass;
                acc.CodeReset = Numrd;
                _db.Entry(acc).State = System.Data.Entity.EntityState.Modified;
                _db.SaveChanges();

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult ResetPass2(string email, int code)
        {
            if (_db.Users.FirstOrDefault(n => n.Email == email && n.CodeReset == code) != null)
            {
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult ResetPass3(string email, string pass)
        {
            try
            {
                var acc = _db.Users.FirstOrDefault(n => n.Email == email);
                pass = Md5.Encryptor.MD5Hash(pass);
                acc.Password = pass;
                _db.Entry(acc).State = System.Data.Entity.EntityState.Modified;
                _db.SaveChanges();

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult ChangePass(string pass)
        {
            try
            {
                var acc = _db.Users.FirstOrDefault(n => n.ID == 1);
                pass = Md5.Encryptor.MD5Hash(pass);
                acc.Password = pass;
                _db.Entry(acc).State = System.Data.Entity.EntityState.Modified;
                _db.SaveChanges();

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult ChangeName(int id, string firstName, string lastName)
        {
            try
            {
                var acc = _db.Users.FirstOrDefault(n => n.ID == id);
                acc.FirstName = firstName;
                acc.LastName = lastName;
                _db.Entry(acc).State = System.Data.Entity.EntityState.Modified;
                _db.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult ChangePhone(int id, string phone)
        {
            try
            {
                var acc = _db.Users.FirstOrDefault(n => n.ID == id);
                acc.Phone = phone;
                _db.Entry(acc).State = System.Data.Entity.EntityState.Modified;
                _db.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult ChangeAddess(int id, string addess)
        {
            try
            {
                var acc = _db.Users.FirstOrDefault(n => n.ID == id);
                acc.Addess = addess;
                _db.Entry(acc).State = System.Data.Entity.EntityState.Modified;
                _db.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult ChangeActive(int id)
        {
            try
            {
                var acc = _db.Users.FirstOrDefault(n => n.ID == id);
                acc.Active = !acc.Active;
                _db.Entry(acc).State = System.Data.Entity.EntityState.Modified;
                _db.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult ChangeTypeAcc(int id, string type)
        {
            try
            {
                var acc = _db.Users.FirstOrDefault(n => n.ID == id);
                acc.TypeAcc = Convert.ToInt32(type);
                _db.Entry(acc).State = System.Data.Entity.EntityState.Modified;
                _db.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public JsonResult ChangeImage(int id, HttpPostedFileBase image)
        {
            var acc = _db.Users.FirstOrDefault(n => n.ID == id);

            FileInfo fileImg = new FileInfo(Server.MapPath("~" + acc.Image));
            try
            {
                string file = image.FileName;
                string path = Server.MapPath("~/Content/img/TaiKhoan/");
                var ac = Guid.NewGuid() + "." + file.Split('.')[1];
                WebImage img = new WebImage(image.InputStream);
                img.Resize(420, 425);
                img.Save(path + ac);

                if (fileImg.Exists)
                {
                    fileImg.Delete();
                }
                if (acc != null)
                {
                    _db.Entry(acc).State = System.Data.Entity.EntityState.Detached;
                }
                acc.Image = "/Content/img/TaiKhoan/" + ac;
                _db.Entry(acc).State = System.Data.Entity.EntityState.Modified;
                _db.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch { return Json(false, JsonRequestBehavior.AllowGet); }
        }
    }
}