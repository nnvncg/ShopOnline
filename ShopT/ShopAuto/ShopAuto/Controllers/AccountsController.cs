using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;
using ShopAuto.Md5;
using ShopAuto.Models;
namespace ShopAuto.Controllers
{
    public class AccountsController : Controller
    {
        // GET: Accounts
        ShopOnlineEntities _db = new ShopOnlineEntities();
        public PartialViewResult Accounts()
        {
            return PartialView();
        }
        public ActionResult Registration(FormCollection f)
        {
            ViewBag.dangKy = "";
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Registration([Bind(Include = "ID,FirstName,LastName,Phone,Email,Image,Password,Addess,TypeAcc,CreateDate,Active")] User user)
        {
            ViewBag.dangKy = "";
            if (ModelState.IsValid)
            {
                if (CheckEmail(user.Email))
                {
                    ViewBag.dangKy = "Email "+ user.Email + " đa tồn tại!";
                    return View();
                }
                else
                {
                    user.TypeAcc = 4;
                    user.CreateDate = DateTime.Now;
                    user.Password = Encryptor.MD5Hash(user.Password);
                    user.Active = true;
                    _db.Users.Add(user);
                    _db.SaveChanges();
                    ViewBag.dangKy = "Đăng ký thành công email "+user.Email;
                    return View();
                }
                
            }
            ViewBag.dangKy = "Đăng ký thất bại!!";
            return View();
        }
        public bool CheckEmail(string email)
        {
           
            bool a = _db.Users.Where(n => n.Email.Contains(email)).ToList().Count !=0?true: false;
            return a;
        }
        public JsonResult SingIn(string acc, string pass)
        {
            User us = new User();
            us = null;
            pass = Encryptor.MD5Hash(pass);
            int query = 0;
            if (ModelState.IsValid)
            {
                us = _db.Users.FirstOrDefault(n => n.Email == acc && n.Password == pass);
                if (us != null && us.Active == true)
                {
                    query = 1;
                    User accounts = UserByEmail(acc);
                    Session["CusEmail"] = acc;
                    Session["GroupAcc"] = accounts.TypeAcc;
                    Session["IdCus"] = accounts.ID;
                    Session["FristName"] = accounts.FirstName;
                    Session["LastName"] = accounts.LastName;
                    Session["Id"] = accounts.ID;

                }
                if (us != null && us.Active == false)
                {
                    query =2;
                }
            }
            return Json(query, JsonRequestBehavior.AllowGet);
        }
        public RedirectResult LogOut()
        {
            Session.Remove("CusEmail");
            Session.Remove("GroupAcc");
            Session.Remove("IdCus");
            Session.Remove("FristName");
            Session.Remove("LastName");
            Session.Remove("Id");
            return Redirect("/");
        }

        public User UserByEmail(string email)
        {
            return _db.Users.First(n => n.Email == email);
        }
        public RedirectResult redirectTo404()
        {
            return Redirect("~/Page/404/index.html");
        }
        public ActionResult AccountInformation()
        {
            if (Session["CusEmail"] == null)
            {

                return RedirectToAction("redirectTo404");
            }
            return View(UserByEmail(Session["CusEmail"].ToString()));
        }
        [HttpPost]
        public ActionResult Upload(HttpPostedFileBase image)
        {
            int Numrd, Numrd2, Numrd3;
            string fileName = null;
            User user = null;
            Random rd = new Random();
            Numrd = rd.Next(100000, 999999);
            Numrd2 = rd.Next(100000, 999999);
            Numrd3 = rd.Next(100000, 999999);
            if (image != null && image.ContentLength > 0)
            {
                if (image.FileName.Contains(".jpg") || image.FileName.Contains(".png"))
                {
                    try
                    {
                        fileName = Numrd + "_" + Numrd2 + "_" + Numrd3 + ".jpg";
                        string path = Path.Combine(Server.MapPath("~/Content/img/TaiKhoan/"), fileName);
                        //chinh kich thuoc
                        WebImage img = new WebImage(image.InputStream);
                        img.Resize(250, 250);
                        img.Save(path);
                        //image.SaveAs(path);
                        ViewBag.Message = "";
                        user = UserByEmail(Session["CusEmail"].ToString());
                        //xoas hinh cu
                        FileInfo file = new FileInfo(Server.MapPath("~" + user.Image));
                        if (file.Exists)
                        {
                            file.Delete();
                        }

                        //them hinh moi
                        user.Image = "/Content/img/TaiKhoan/" + fileName;
                        _db.Entry(user).State = EntityState.Modified;
                        _db.SaveChanges();
                }
                    catch (Exception ex)
                {
                    ViewBag.Message = "Lỗi:" + ex.Message.ToString();
                }
            }
                else
                {
                    ViewBag.Message = "Tập tin hình ảnh của bạn sai!";
                }
            }


            else
            {
                ViewBag.Message = "Tập tin hình ảnh của bạn sai!";
            }
            return RedirectToAction("AccountInformation");

        }
        [HttpPost]
        public ActionResult UpdateInformation( FormCollection f)
        {
            if (Session["IdCus"] == null)
            {
                Response.StatusCode = 404;
            }
            else
            {
                User account= UserByEmail(Session["CusEmail"].ToString());
                account.FirstName = f["FirstName"].ToString();
                account.LastName = f["LastName"].ToString();
                account.Phone = f["Phone"].ToString(); 
                account.Addess = f["Address"].ToString();
                _db.Entry(account).State = EntityState.Modified;
                _db.SaveChanges();
            }
            return RedirectToAction("AccountInformation");
        }
        [HttpPost]
        public ActionResult ChangePass(FormCollection f)
        {
            if (Session["IdCus"] == null)
            {
                Response.StatusCode = 404;
            }
            else
            {
                string b = Encryptor.MD5Hash(f["OldPass"].ToString());
                User account = UserByEmail(Session["CusEmail"].ToString());
                string d = Encryptor.MD5Hash(account.Password);
                string c = account.Password;
                if (f["NewPass"].ToString()== f["NewPass2"].ToString()&&account.Password.Contains(Encryptor.MD5Hash(f["OldPass"].ToString())))
                {
                    
                    account.Password = Encryptor.MD5Hash(f["NewPass"].ToString());
                    _db.Entry(account).State = EntityState.Modified;
                    _db.SaveChanges();
                }
                if(f["NewPass"].ToString() != f["NewPass2"].ToString())
                {
                    ViewBag.message2 = "Xác nhận mật khẩu mới sai!";
                }
                if (account.Password.Contains(Encryptor.MD5Hash(f["OldPass"].ToString())))
                {
                    ViewBag.message2 = "Xác nhận mật khẩu cũ sai!";
                }
            }
            return RedirectToAction("");
        }
        public ActionResult OrderByAccount()
        {
            int id = 0;
            if (Session["IdCus"] == null)
            {
                return RedirectToAction("AccountInformation");
                
            }
            else
            {
                id  = Convert.ToInt32(Session["IdCus"]);
            }
            return View(_db.Bills.Where(n=>n.Creator==id).OrderByDescending(n=>n.CreateDate).ToList());
        }
    }
        
}