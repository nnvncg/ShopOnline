using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ShopAuto.Models;
using PagedList;
using PagedList.Mvc;
namespace ShopAuto.Controllers
{
    public class FindController : Controller
    {
        //
        // GET: /Find/
        ShopOnlineEntities _db=new ShopOnlineEntities();
        [HttpPost]
        public ActionResult Search(FormCollection f, int? page)
        {
            int pageNumber = (page ?? 1);
            int pageSize = 9;
            string sKeyword = f["txtSearch"];
            ViewBag.Keyword = sKeyword;
            List<Product> lstPro = _db.Products.Where(n => n.ProductName.Contains(sKeyword)).ToList();
            if (lstPro.Count==0)
            {
                ViewBag.Message = "Không có kết quả cho từ khóa "+ sKeyword +".";
                return View(lstPro.OrderBy(n => n.ProductName).ToPagedList(pageNumber, pageSize));
            }
            ViewBag.Message = "Đã tìm thấy " + lstPro.Count + " kết quả: ";
            return View(lstPro.OrderBy(n => n.ProductName).ToPagedList(pageNumber, pageSize));
        }
        [HttpGet]
        public ActionResult Search( int? page,string sKeyword)
        {
            int pageNumber = (page ?? 1);
            int pageSize = 9;
            ViewBag.Keyword = sKeyword;
            List<Product> lstPro = _db.Products.Where(n => n.ProductName.Contains(sKeyword)).ToList();
            if (lstPro.Count == 0)
            {
                ViewBag.Message = "Không có kết quả cho từ khóa " + sKeyword + ".";
                return View(lstPro.OrderBy(n => n.ProductName).ToPagedList(pageNumber, pageSize));
            }
            ViewBag.Message = "Đã tìm thấy " + lstPro.Count + " kết quả:";
            return View(lstPro.OrderBy(n => n.ProductName).ToPagedList(pageNumber, pageSize));
        }
	}
}