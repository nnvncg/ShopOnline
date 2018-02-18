using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ShopAuto.Models;
namespace ShopAuto.Controllers.ControllersAdmin
{
    public class StatusBillController : Controller
    {
        ShopOnlineEntities _db = new ShopOnlineEntities();
        // GET: StatusBill
        public ActionResult StatusBill()
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
        public JsonResult ListStatus()
        {
            List<StatusBill> lstStatus = _db.StatusBills.OrderByDescending(n => n.CreateDate).ToList();
            return Json(lstStatus, JsonRequestBehavior.AllowGet);
        }
        public JsonResult DeleteStatus(int _id)
        {
            try
            {
                StatusBill lstStatus = _db.StatusBills.FirstOrDefault(n => n.ID == _id);
                _db.StatusBills.Remove(lstStatus);
                _db.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
            
        }
        public JsonResult EditStatus(StatusBill status)
        {
            try
            {
                status.CreateDate = DateTime.Now;
                status.Creator = 1;
                _db.Entry(status).State = System.Data.Entity.EntityState.Modified;
                _db.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }

        }
        public JsonResult StatusById(int _id)
        {

                StatusBill lstStatus = _db.StatusBills.FirstOrDefault(n => n.ID == _id);              
                return Json(lstStatus, JsonRequestBehavior.AllowGet);
            
        }
        public JsonResult AddStatus(string name,string information)
        {
            StatusBill status=new StatusBill();
            try
            {
                status.NameStatusBill = name;
                status.InformationStatus = information;
                status.CreateDate = DateTime.Now;
                status.Creator = 1;
                _db.StatusBills.Add(status);
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