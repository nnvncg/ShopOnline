using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Configuration;
using System.Web;
using System.Web.Mvc;
using ShopAuto.Models;
namespace ShopAuto.Controllers.ControllersAdmin
{
    public class ContactAdminController : Controller
    {
        // GET: Contact
        ShopOnlineEntities _db = new ShopOnlineEntities();
        public ActionResult Contact()
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
                if (_gr.Authorities.Contains("-14-") || _gr.Authorities.Contains("-1-"))
                {
                    return View();
                }
                return Redirect("~/Page/404/index.html");

            }
        }
        public JsonResult All()
        {
            return Json(_db.Contacts.OrderByDescending(n => n.CreateDate).ToList(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Seen()
        {
            return Json(_db.Contacts.OrderByDescending(n => n.CreateDate).Where(n => n.Status == false).ToList(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult ContactById(int id)
        {
            return Json(_db.Contacts.FirstOrDefault(n => n.ID == id), JsonRequestBehavior.AllowGet);
        }
        public JsonResult ContactByDate(string date)
        {
           var cont= _db.Contacts.ToList();
            var lstCont = new List<Contact>();
            string[] arrListStr = date.Split('-');
            foreach(var item in cont)
            {
                int y = Convert.ToInt32(arrListStr[0]);
                int m = Convert.ToInt32(arrListStr[1]);
                int d = Convert.ToInt32(arrListStr[2]);
                if (item.CreateDate.Year == y&& item.CreateDate.Month ==m&& item.CreateDate.Day == d)
                {
                    lstCont.Add(item);
                }
            }
            return Json(lstCont, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Status(int id)
        {
            try
            {
                var cont = _db.Contacts.FirstOrDefault(n => n.ID == id);
                if (cont.Status == false)
                {
                    cont.Status = true;
                    _db.Entry(cont).State = System.Data.Entity.EntityState.Modified;
                    _db.SaveChanges();
                }
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch (Exception)
            {

                return Json(false, JsonRequestBehavior.AllowGet);

            }
        }
        public JsonResult remove(int id)
        {
            try
            {
                var cont = _db.Contacts.FirstOrDefault(n => n.ID == id);
                _db.Contacts.Remove(cont);
                _db.SaveChanges();

                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch (Exception)
            {

                return Json(false, JsonRequestBehavior.AllowGet);

            }
        }
        public JsonResult sendEmail(string title, string content, int id)
        {
            var cont = _db.Contacts.FirstOrDefault(n => n.ID == id);
            var shop = _db.ShopInformations.FirstOrDefault();
            try
            {
                StringBuilder Body = new StringBuilder();
                Body.Append("<p>" + shop.NameShop + " cảm ơn anh(chị) " + cont.Name + " đã ghé thăm " + shop.NameShop + "</p>");
                Body.Append("<p>Chúng tôi đã nhận được một phản hồi của bạn gửi vào lúc " + _db.Contacts.FirstOrDefault(n => n.ID == id).CreateDate + "</p>");
                Body.Append("<p>Chúng tôi xin gửi lời cảm ơn chân thành tới sự quan tâm của bạn tới " + shop.NameShop + "</p>");
                Body.Append("<p>Về vấn đề của bạn chúng tôi xin trả lời như sau: </p><br/>");
                Body.Append("<p>" + content + "</p><br/>");
                Body.Append("<p>Cảm ơn bạn đã đọc.</p>");
                MailMessage mail = new MailMessage();
                mail.To.Add(cont.Email);
                mail.From = new MailAddress(shop.Email);
                mail.Subject = title;//tiêu đề mail
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
                return Json(false, JsonRequestBehavior.AllowGet);
            }
        }
    }
}