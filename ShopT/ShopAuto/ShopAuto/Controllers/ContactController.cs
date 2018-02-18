using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ShopAuto.Models;
namespace ShopAuto.Controllers
{
    public class ContactController : Controller
    {
        ShopOnlineEntities _db=new ShopOnlineEntities();
        //
        // GET: /Contact/
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Index([Bind(Include = "ID,Content,Email,Name")] Contact contact)
        {
            if (ModelState.IsValid)
            {
                contact.Status = true;
                _db.Contacts.Add(contact);
                _db.SaveChanges();
                ViewBag.Message = "Liên hệ đã được gửi. Chúng tôi sẽ liên hệ bạn sớm nhất!";
                
            }
            else
            {
                ModelState.AddModelError("","Tin nhắn của bạn không gửi được!");
            }
            return View();
        }
	}
}