using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
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
        public JsonResult Tinh_ThanhPho()
        {            
            return Json(_db.devvn_tinhthanhpho.OrderBy(n=>n.matp).ToList(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Quan_Huyen(string matp)
        {
            return Json(_db.devvn_quanhuyen.OrderBy(n => n.maqh).Where(n=>n.matp==matp).ToList(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Xa_Phuong(string maqh)
        {
            return Json(_db.devvn_xaphuongthitran.OrderBy(n => n.xaid).Where(n => n.maqh == maqh).ToList(), JsonRequestBehavior.AllowGet);
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
            double total= Total();
            return Json(total, JsonRequestBehavior.AllowGet);
        }
        public double Total()
        {
            double total = 0;
            List<Orders> lstGioHang = Cart2();
            foreach (var item in lstGioHang)
            {
                total += item.ProIntoMoney;
            }
            return total;
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
       
        //đặt hàng:
        public JsonResult AddOrder(string email,string name,string phone,string addess,string note)
        {
            List<Orders> lstGioHang = Session["Orders"] as List<Orders>;
            var bill = new Bill();
            try
            {
                if (lstGioHang == null)
                {
                    return Json(false, JsonRequestBehavior.AllowGet);
                }
                if (Session["Id"] != null)
                {
                    bill.Creator = Convert.ToInt32(Session["Id"].ToString());
                }
                else
                {
                    bill.Creator = 0;
                }
                //tao ma hoa don
                int Numrd;
                int i = 0;
                string Numrd_str;
                var rd = new Random();
                Numrd = rd.Next(100, 999);
                Numrd_str = Convert.ToString((char)rd.Next(65, 90));
                string TradingCode= Numrd_str+Numrd+ DateTime.Now.Hour+ DateTime.Now.Minute+ DateTime.Now.Day+ DateTime.Now.Month+ DateTime.Now.Year.ToString().Substring(2,3);
                //dia chi
                var xa = _db.devvn_xaphuongthitran.FirstOrDefault(n =>n.xaid == addess);
                var huyen= _db.devvn_quanhuyen.FirstOrDefault(n => n.maqh == xa.maqh);
                var tinh = _db.devvn_tinhthanhpho.FirstOrDefault(n => n.matp == huyen.matp);
                string addes = xa.name + " - " + huyen.name + " - " + tinh.name;
                bill.TradingCode = TradingCode;
                bill.CreateDate = DateTime.Now;
                bill.Email = email;
                bill.Phone = phone;
                bill.Name = name;
                bill.Status = 1;
                bill.Seen = false;
                bill.TotalMoney = Total();
                bill.Addess = addes;
                bill.Note = note;
                _db.Bills.Add(bill);
                _db.SaveChanges();
                foreach (var item in lstGioHang)
                {
                    var lstBillDetail = new BillDetail();
                    lstBillDetail.IdBill = bill.ID;
                    lstBillDetail.IdProduct = item.ProId;
                    lstBillDetail.Quantity = item.ProQuantity;
                    lstBillDetail.Price = item.ProIntoMoney;
                    _db.BillDetails.Add(lstBillDetail);
                    _db.SaveChanges();
                }
                //phần gửi email
                var shop = _db.ShopInformations.FirstOrDefault();
                
                StringBuilder Body = new StringBuilder();
                Body.Append("<p>Kính gửi anh(chị) " + name + " đã sử dụng dịch vụ đặt hàng của " + shop.NameShop + " </p>");
                Body.Append("<p>Chúng tôi đã nhận được đơn đặt hàng của anh(chị)  " + name + " vào "+DateTime.Now+"</p>");
                Body.Append("<p>Nội dung đơn đặt hàng như sau:</p>");
                //hóa đơn chi tiết
                Body.Append("<table>");
                Body.Append("<tr><td colspan='2'><h4>Thông tin hóa đơn:</h4></td></tr>");
                Body.Append("<tr><td>Mã kiểm tra hóa đơn:</td><td>" + TradingCode + "</td></tr>");
                Body.Append("<tr><td>Tên người nhận:</td><td>" + name +"</td></tr>");
                Body.Append("<tr><td>Email:</td><td>" + email + "</td></tr>");
                Body.Append("<tr><td>Số điện thoại:</td><td>" + phone + "</td></tr>");
                Body.Append("<p>Hóa đơn chi tiết:</p>");
                Body.Append("<tr><td>#</td><td>Tên sản phẩm</td><td>Số lượng</td><td>&nbsp;Thành tiền </td></tr>");
                foreach (var item in lstGioHang)
                {
                    i++;
                    Body.Append("<tr><td>" + i + "</td><td>" + item.ProName + "</td><td><p>&nbsp;&nbsp;" + item.ProQuantity + "</p></td><td>" + item.ProIntoMoney + " VND &nbsp;</td></tr>");
                }
                Body.Append("<tr><td>Tổng tiền:</td><td>" + Total() + " VND</td></tr>");
                Body.Append("</table>");
                Body.Append("<p>Chúng tôi sẽ phản hồi đơn đặt hàng của bạn sớm nhất.</p>");
                Body.Append("<p>Chân thành chúc sức khỏe và cảm ơn bạn đã đọc.</p>");
                MailMessage mail = new MailMessage();
                string emaiNhaHang = shop.Email;
                mail.To.Add(email);
                mail.From = new MailAddress("nnvncg1@gmail.com");
                mail.Subject = "Thông tin đặt hàng.";//tiêu đề mail
                mail.Body = Body.ToString();// phần thân của mail ở trên
                mail.IsBodyHtml = true;
                SmtpClient smtp = new SmtpClient();
                smtp.Host = "smtp.gmail.com";
                //smtp.Port = 587;
                //smtp.UseDefaultCredentials = true;
                smtp.Credentials = new System.Net.NetworkCredential("nnvncg1@gmail.com", "q123456789");// tài khoản Gmail người gửi
                smtp.EnableSsl = true;
                smtp.Send(mail);
                Session.Remove("Orders");

                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }

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