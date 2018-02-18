using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using ShopAuto.Models;


namespace ShopAuto.Controllers
{
    public class OrderController : Controller
    {
        ShopOnlineEntities _db=new ShopOnlineEntities();
        //
        // GET: /Order/
        public ActionResult Cart()
        {
            return View();
        }
        public ActionResult PayOrder()
        {
            return View();
        }
        public JsonResult GetCart()
        {
            List<Orders> lstOrder = Session["Orders"] as List<Orders>;
            if (lstOrder == null)
            {
                lstOrder = null;
            }            
            return Json(lstOrder, JsonRequestBehavior.AllowGet);
        }
        public JsonResult QuantityOrder()
        {
            int t = 0;
            List<Orders> lstOrder = Session["Orders"] as List<Orders>;
            if (lstOrder != null)
            {
               t= lstOrder.Count();
            }
            return Json(t, JsonRequestBehavior.AllowGet);
        }
        public List<Orders> Cart2()
        {
            List<Orders> lstOrder = Session["Orders"] as List<Orders>;
            //kiem tra, khoi tao gio hang
            if (lstOrder == null)
            {
                lstOrder = new List<Orders>();
                Session["Orders"] = lstOrder;
            }
            return lstOrder;
        }
        public JsonResult FindPro(string iMaSp)
        {
            int _id = Convert.ToInt32(iMaSp);
            List<Orders> lstOrder = Session["Orders"] as List<Orders>;
            Orders _product;
            if (lstOrder == null)
            {
                _product = null;
            }
            else
            {
                _product = lstOrder.Find(n => n.ProId == _id);
            }
            return Json(_product, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AddCard(string iMaSp)
        {
            int _id = Convert.ToInt32(iMaSp);
            Product _prod = _db.Products.SingleOrDefault(n => n.ID == _id);
            if (_prod == null )
            {
                //Response.StatusCode = 404;
                
                return Json("Thêm thất bại", JsonRequestBehavior.AllowGet);
            }
            List<Orders> lstGioHang = Cart2();
            Orders sanPham = lstGioHang.Find(n => n.ProId== _id);
            if (sanPham == null)
            {
                sanPham = new Orders(_id);
                lstGioHang.Add(sanPham);
            }
            else
            {
                sanPham.ProQuantity++;
            }
            return Json("Thêm thành công", JsonRequestBehavior.AllowGet);
        }
        public JsonResult UpdateQuantity(string Quantity, string Id)
        {
            int _prodId = Convert.ToInt32(Id);
            int _prodQuantity = Convert.ToInt32(Quantity);
            List<Orders> lstGioHang = Cart2();
            Orders sanpham = lstGioHang.SingleOrDefault(n => n.ProId== _prodId);
            if (sanpham != null)
            {
                sanpham.ProQuantity = _prodQuantity;
            }
            return Json("Thêm thành công", JsonRequestBehavior.AllowGet);
        }
        public JsonResult TotalMoney()
        {
            double total=0;
            List<Orders> lstGioHang = Cart2();
            foreach(var item in lstGioHang)
            {
                total += item.ProIntoMoney;
            }
            return Json(total, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult Delete(int _IdProd)
        {
            List<Orders> lstGioHang = Session["Orders"] as List<Orders>;
            string name = lstGioHang.Find(n => n.ProId == _IdProd).ProName;
            lstGioHang.RemoveAll(n => n.ProId == _IdProd);            
            Session["Orders"] = lstGioHang;            
            return Json(name, JsonRequestBehavior.AllowGet);
        }
        
        public JsonResult DeleteAll()
        {
            Session.Remove("Orders");
            return Json("Xóa thành công!!", JsonRequestBehavior.AllowGet);
        }
        public ActionResult Index()
        {
            JsonResult lstGioHang = FindOrder();
            return View();
        }
        public JsonResult FindOrder2(string TradingCode)
        {           
            var query = _db.Bills.FirstOrDefault(n=>n.TradingCode == TradingCode);
            return Json(query, JsonRequestBehavior.AllowGet);
        }
        public JsonResult FindOrder()
        {

            var query = _db.Bills.ToList();
            
            return Json(query, JsonRequestBehavior.AllowGet);
        }
        public JsonResult FindBillDetail(string id)
        {
            int i = Convert.ToInt32(id);
            var query = _db.BillDetails.Where(n=>n.IdBill==i);
            return Json(query, JsonRequestBehavior.AllowGet);
        }
        public JsonResult FindBillStatus(string id)
        {
            //string id
            int i = Convert.ToInt32(id);
            var query = _db.StatusBills.FirstOrDefault(n => n.ID == i);
            return Json(query, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ProductByBill(string id)
        {
            //string id
            int i = Convert.ToInt32(id);
            var query = _db.Products.FirstOrDefault(n => n.ID == i);
            return Json(query, JsonRequestBehavior.AllowGet);
        }
    }
}