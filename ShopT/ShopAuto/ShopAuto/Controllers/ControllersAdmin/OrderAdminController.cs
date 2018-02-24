using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ShopAuto.Models;
namespace ShopAuto.Controllers.ControllersAdmin
{
    public class OrderAdminController : Controller
    {
        ShopOnlineEntities _db = new ShopOnlineEntities();
        // GET: OrderAdmin
        public ActionResult Order()
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
        public ActionResult NewOrder()
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
                if (_gr.Authorities.Contains("-32-") || _gr.Authorities.Contains("-1-"))
                {
                    return View();
                }
                return Redirect("~/Page/404/index.html");

            }
        }
        public JsonResult GetNewCart()
        {           
            List<Bill> lstOrder = _db.Bills.OrderByDescending(n => n.CreateDate).Where(n=>n.Seen==false).Take(4).ToList();
            return Json(lstOrder, JsonRequestBehavior.AllowGet);
        }
        public JsonResult BillByCreator(int _id)
        {
            List<Bill> lstOrder = _db.Bills.OrderByDescending(n => n.CreateDate).Where(n => n.Creator == _id).ToList();            
            return Json(lstOrder, JsonRequestBehavior.AllowGet);
        }
        public JsonResult QuantityAllOrder()
        {          
            var lstOrder = _db.Bills.Count();
            return Json(lstOrder, JsonRequestBehavior.AllowGet);
        }
        public JsonResult QuantityNewDate()
        {           
            var lstOrder = _db.Bills.Where(n=>n.CreateDate==DateTime.Now).Count();
            return Json(lstOrder, JsonRequestBehavior.AllowGet);
        }
        public JsonResult QuantityNewCart()
        {
            int quantity = _db.Bills.OrderByDescending(n => n.CreateDate).Where(n => n.Seen == false).Take(4).Count();
            return Json(quantity, JsonRequestBehavior.AllowGet);
        }
        public JsonResult AllOrder()
        {
            return Json(_db.Bills.OrderByDescending(n => n.CreateDate).ToList(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult AllStatust()
        {
            return Json(_db.StatusBills.ToList(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult OrderDetail(int id)
        {
            Bill bill = _db.Bills.FirstOrDefault(n => n.ID == id);
            return Json(bill, JsonRequestBehavior.AllowGet);
        }
        public JsonResult BillDetailByIdBill(int id)
        {
            var billDetail = _db.BillDetails.Where(n=>n.IdBill==id).ToList();
            return Json(billDetail, JsonRequestBehavior.AllowGet);
        }
        public JsonResult UpdateView(int id)
        {
            Bill bill = _db.Bills.FirstOrDefault(n => n.ID == id);
            bill.Seen = true;
            _db.Entry(bill).State = System.Data.Entity.EntityState.Modified;
            _db.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }
        public JsonResult UpdateStatust(int id,int status)
        {
            Bill bill = _db.Bills.FirstOrDefault(n => n.ID == id);
            bill.Status = status;
            _db.Entry(bill).State = System.Data.Entity.EntityState.Modified;
            _db.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }
        public JsonResult DeleteOrder(int id)
        {
            try
            {
                Bill bill = _db.Bills.FirstOrDefault(n => n.ID == id);
                var billDetail = _db.BillDetails.Where(n => n.IdBill == id).ToList();
                foreach (var item in billDetail)
                {
                    _db.BillDetails.Remove(item);
                }
                _db.Bills.Remove(bill);
                _db.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
            
        }
    }
}