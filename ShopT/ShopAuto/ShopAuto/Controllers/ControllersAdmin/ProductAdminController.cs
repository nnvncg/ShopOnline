using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;
using ShopAuto.Models;
namespace ShopAuto.Controllers.ControllersAdmin
{
    public class ProductAdminController : Controller
    {
        ShopOnlineEntities _db = new ShopOnlineEntities();
        // GET: ProductAdmin
        public ActionResult AllProduct()
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
        public JsonResult ListProduct()
        {
            List<Product> lstOrder = _db.Products.OrderByDescending(n => n.CreateDate).ToList();
            return Json(lstOrder, JsonRequestBehavior.AllowGet);
        }
        public JsonResult DleteProduct(string id)
        {
            int _id = Convert.ToInt32(id);
            Product _product = _db.Products.Find(_id);
            _db.Products.Remove(_product);
            _db.SaveChanges();
            return Json("da xoa", JsonRequestBehavior.AllowGet);
        }
        public JsonResult ListProductById(string id)
        {
            int _id = Convert.ToInt32(id);
            Product lstOrder = _db.Products.FirstOrDefault(n => n.ID == _id);
            return Json(lstOrder, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ChangeActive(int id)
        {
            try
            {
                Product _product = _db.Products.FirstOrDefault(n => n.ID == id);
                _product.Active = !_product.Active;
                _db.Entry(_product).State = EntityState.Modified;
                _db.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }

        }
        public void DeleteImgByID(int id)
        {
            //xoas hinh cu

            Product lstpro = _db.Products.FirstOrDefault(n => n.ID == id);
            FileInfo file = new FileInfo(Server.MapPath("~" + lstpro.Image));
            if (file.Exists)
            {
                file.Delete();
            }
        }
        [HttpPost]
        [ValidateInput(false)]
        public JsonResult AddProduct(Product product, HttpPostedFileBase Image)
        {
            if (Session["EmailAdmin"] == null)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
            if (ModelState.IsValid)
            {
                string fileName = null;
                if (Image != null && Image.ContentLength > 0)
                {
                    if (Image.FileName.Contains(".jpg") || Image.FileName.Contains(".png"))
                    {
                        try
                        {
                            fileName = Guid.NewGuid() + "." + Image.FileName.Split('.')[1];
                            string path = Path.Combine(Server.MapPath("~/Content/img/MonAn/"), fileName);
                            //chinh kich thuoc
                            WebImage img = new WebImage(Image.InputStream);
                            img.Resize(650, 430);
                            img.Save(path);
                            product.Image = "/Content/img/MonAn/" + fileName;

                        }
                        catch
                        {
                            product.Image = "";
                        }

                    }
                }
                else
                {
                    product.Image = "";
                }
                product.CreateDate = DateTime.Now;
                product.Creator = Convert.ToInt32(Session["IDAccAdmin"]);
                product.Active = true;
                _db.Products.Add(product);
                _db.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            return Json(false, JsonRequestBehavior.AllowGet);

        }
        [HttpPost]
        [ValidateInput(false)]
        public JsonResult Edit(Product product, HttpPostedFileBase fileImage)
        {
            string fileName = "";
            Product _prod = null;
            _prod = product;
            if (Session["EmailAdmin"] == null)
            {
                return Json(false, JsonRequestBehavior.AllowGet);
            }
            try
            {
                if (fileImage != null && fileImage.ContentLength > 0)
                {
                    try
                    {
                        if (fileImage.FileName.Contains(".jpg") || fileImage.FileName.Contains(".png"))
                        {
                            fileName = Guid.NewGuid() + "." + fileImage.FileName.Split('.')[1];
                            string path = Path.Combine(Server.MapPath("~/Content/img/MonAn/"), fileName);
                            //chinh kich thuoc
                            WebImage img = new WebImage(fileImage.InputStream);
                            img.Resize(650, 430);
                            img.Save(path);
                            _prod = _db.Products.FirstOrDefault(n => n.ID == _prod.ID);

                            FileInfo file = new FileInfo(Server.MapPath("~" + _prod.Image));
                            if (file.Exists)
                            {
                                file.Delete();
                            }
                            if (_prod != null)
                            {
                                _db.Entry(_prod).State = EntityState.Detached;
                            }
                            product.Image = "/Content/img/MonAn/" + fileName;
                        }
                        else
                        {
                            product.Image = null;
                        }
                    }
                    catch
                    {
                        product.Image = null;
                    }
                }
                else
                {
                    product.Image = null;
                }
                product.CreateDate = DateTime.Now;
                product.Creator = Convert.ToInt32(Session["IDAccAdmin"]);
                _db.Entry(product).State = EntityState.Modified;
                _db.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);

            }
            catch (Exception)
            {
                return Json(false, JsonRequestBehavior.AllowGet);

            }

        }
    }
}