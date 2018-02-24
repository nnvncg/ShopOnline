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
using System.Net.Mail;
using System.Data.Entity;

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
        public ActionResult AccountDetail(int id)
        {
            var user = _db.Users.FirstOrDefault(n => n.ID == id);
            if (user != null)
            {
                ViewBag.Name = user.FirstName + " " + user.LastName;
                return View(user);
            }
            return Redirect("~/Page/404/index.html");
        }
        public ActionResult Login()
        {
            if (Session["EmailAdmin"] != null)
            {
                return Redirect("Account");
            }
            return View();
        }
        public JsonResult SendCodeResetPass(string email)
        {
            var user = _db.Users.FirstOrDefault(n => n.Email == email);
            if (user == null)
            {
                return Json("Email sai!", JsonRequestBehavior.AllowGet);
            }
            else
            {
                try
                {
                    int Numrd;
                    var rd = new Random();
                    Numrd = rd.Next(10000, 99999);
                    user.CodeReset = Numrd;
                    _db.Entry(user).State = EntityState.Modified;
                    _db.SaveChanges();
                    var shop = _db.ShopInformations.FirstOrDefault();
                    System.Text.StringBuilder Body = new System.Text.StringBuilder();
                    Body.Append("<p>Kính gửi anh(chị), " + shop.NameShop + " Xin chào quý khách </p>");
                    Body.Append("<p>Chúng tôi đã nhận được yêu cầu đổi lại mật khẩu của anh(chị) vào lúc " + DateTime.Now + "</p>");
                    Body.Append("<p>Chúng tôi xin gửi mã xác nhận : <span colspan='2'>" + Numrd + "</span></p>");
                    Body.Append("<p>Chân thành chúc sức khỏe và cảm ơn bạn đã đọc.</p>");
                    MailMessage mail = new MailMessage();
                    mail.To.Add(email);
                    mail.From = new MailAddress(shop.Email);
                    mail.Subject = "Mã xác nhận.";//tiêu đề mail
                    mail.Body = Body.ToString();// phần thân của mail ở trên
                    mail.IsBodyHtml = true;
                    SmtpClient smtp = new SmtpClient();
                    smtp.Host = "smtp.gmail.com";
                    //smtp.Port = 587;
                    //smtp.UseDefaultCredentials = true;
                    smtp.Credentials = new System.Net.NetworkCredential(shop.Email, shop.PassWordEmail);// tài khoản Gmail người gửi
                    smtp.EnableSsl = true;
                    smtp.Send(mail);
                    return Json(true, JsonRequestBehavior.AllowGet);
                }
                catch (Exception)
                {
                    return Json("Gửi mã xác nhận thất bại!", JsonRequestBehavior.AllowGet);
                }
            }
        }
        public JsonResult checkCode(string email, string code)
        {
            var user = _db.Users.FirstOrDefault(n => n.Email == email);
            if (user == null)
            {
                return Json(1, JsonRequestBehavior.AllowGet);
            }
            if (user.CodeReset == Convert.ToInt32(code))
            {
                return Json(2, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(3, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult ResetPass(string email, string pass)
        {
            var user = _db.Users.FirstOrDefault(n => n.Email == email);
            if (user == null)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
            else
            {
                try
                {
                    string d = Encryptor.MD5Hash(pass);
                    user.Password = d;
                    user.CodeReset = 0;
                    _db.Entry(user).State = EntityState.Modified;
                    _db.SaveChanges();
                    return Json(true, JsonRequestBehavior.AllowGet);

                }
                catch (Exception)
                {
                    return Json(false, JsonRequestBehavior.AllowGet);

                }
            }
        }
        public JsonResult LogInAdmin(string email, string pass)
        {
            var acc = _db.Users.FirstOrDefault(n => n.Email == email);
            if (acc == null)
            {
                return Json("Bại không thể đăng nhập vào trang này!!", JsonRequestBehavior.AllowGet);
            }
            if (acc.TypeAcc == 4)
            {
                return Json("Bại không thể đăng nhập vào trang này!!", JsonRequestBehavior.AllowGet);
            }
            if (acc.Active == false)
            {
                return Json("Tài khoản của bạn đã bị khóa, hãy liên hệ quản lý trang!", JsonRequestBehavior.AllowGet);
            }
            string pass1 = Md5.Encryptor.MD5Hash(pass);
            if (acc.Password.Contains(pass1))
            {
                Session["EmailAdmin"] = email;
                Session["IDAccAdmin"] = acc.ID;
                return Json(1, JsonRequestBehavior.AllowGet);
            }
            else
                return Json("Mật khẩu hoặc tài khoản sai!", JsonRequestBehavior.AllowGet);
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
        public JsonResult AccById1(int id)
        {
            var _user = _db.Users.FirstOrDefault(n => n.ID == id);
            if (_user == null)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
            return Json(_user, JsonRequestBehavior.AllowGet);
        }
        public JsonResult AccById()
        {
            if (Session["IDAccAdmin"] == null)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
            else
            {
                int id = Convert.ToInt32(Session["IDAccAdmin"].ToString());
                return Json(_db.Users.FirstOrDefault(n => n.ID == id), JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult CheckLogIn()
        {
            if (Session["IDAccAdmin"] == null)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(true, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult ChangePass(string pass)
        {
            if (Session["IDAccAdmin"] == null)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
            else
            {
                int id = Convert.ToInt32(Session["IDAccAdmin"].ToString());
                try
                {
                    var acc = _db.Users.FirstOrDefault(n => n.ID == id);
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
        }
        public JsonResult ChangeName(string firstName, string lastName)
        {
            if (Session["IDAccAdmin"] == null)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
            else
            {
                int id = Convert.ToInt32(Session["IDAccAdmin"].ToString());
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
        }
        public JsonResult ChangePhone(string phone)
        {
            if (Session["IDAccAdmin"] == null)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
            else
            {
                int id = Convert.ToInt32(Session["IDAccAdmin"].ToString());

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
        }
        public JsonResult ChangeAddess(string addess)
        {
            if (Session["IDAccAdmin"] == null)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
            else
            {
                int id = Convert.ToInt32(Session["IDAccAdmin"].ToString());

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
        }
        public JsonResult ChangeActive(int id)
        {
            try
            {
                var acc = _db.Users.FirstOrDefault(n => n.ID == id);
                acc.Active = !acc.Active;
                _db.Entry(acc).State = EntityState.Modified;
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
        public JsonResult ChangeImage(HttpPostedFileBase image)
        {
            if (Session["IDAccAdmin"] == null)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
            else
            {
                int id = Convert.ToInt32(Session["IDAccAdmin"].ToString());
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

                    if (fileImg.Exists&& !acc.Image.Contains("hinhdd.jpg"))
                    {
                        fileImg.Delete();
                    }
                    if (acc != null)
                    {
                        _db.Entry(acc).State = EntityState.Detached;
                    }
                    acc.Image = "/Content/img/TaiKhoan/" + ac;
                    _db.Entry(acc).State = EntityState.Modified;
                    _db.SaveChanges();
                    return Json(true, JsonRequestBehavior.AllowGet);
                }
                catch { return Json(false, JsonRequestBehavior.AllowGet); }
            }
        }
    }
}