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
    public class SliderAdminController : Controller
    {
        // GET: SliderAdmin
        ShopOnlineEntities _db = new ShopOnlineEntities();

        public ActionResult Slider()
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
        public JsonResult ListSlider()
        {
            List<Slider> lstStatus = _db.Sliders.OrderByDescending(n => n.Order).ToList();
            return Json(lstStatus, JsonRequestBehavior.AllowGet);
        }
        public JsonResult SliderDetail(int id)
        {
            Slider slider = _db.Sliders.FirstOrDefault(n => n.Id == id);
            return Json(slider, JsonRequestBehavior.AllowGet);
        }
        public JsonResult SliderRemove(int id)
        {
            try
            {
                Slider slider = _db.Sliders.FirstOrDefault(n => n.Id == id);
                FileInfo file = new FileInfo(Server.MapPath("~" + slider.Image));
                if (file.Exists)
                {
                    file.Delete();
                }
                //if (slider != null)
                //{
                //    _db.Entry(slider).State = System.Data.Entity.EntityState.Detached;
                //}
                _db.Sliders.Remove(slider);
                _db.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch { return Json(false, JsonRequestBehavior.AllowGet); }
        }
        [HttpPost]
        [ValidateInput(false)]
        public JsonResult SliderAdd(Slider slider, HttpPostedFileBase aFile)
        {
            try
            {
                string file = aFile.FileName;
                string path = Server.MapPath("~/Content/img/MonAn/KhuyenMai-Sukien/");                
                var ac = Guid.NewGuid() + "." + file.Split('.')[1];
                WebImage img = new WebImage(aFile.InputStream);
                img.Resize(960, 800);
                img.Save(path + ac );
                slider.Image = "/Content/img/MonAn/KhuyenMai-Sukien/" + ac;
                slider.DateCreate = DateTime.Now;
                slider.Creater = 1;
                slider.Active = true;
                _db.Sliders.Add(slider);
                _db.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch { return Json(false, JsonRequestBehavior.AllowGet); }
        }
        [HttpPost]
        [ValidateInput(false)]
        public JsonResult SliderActive(int id)
        {
            Slider _sligerActive = _db.Sliders.FirstOrDefault(n => n.Id == id);
            _sligerActive.Active = !_sligerActive.Active;
            _db.Entry(_sligerActive).State = EntityState.Modified;
            _db.SaveChanges();
            return Json(true, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [ValidateInput(false)]
        public JsonResult SliderEdit(Slider slider, HttpPostedFileBase aFile)
        {
            try
            {
                if (aFile != null)
                {
                    Slider deleteImg = _db.Sliders.FirstOrDefault(n => n.Id == slider.Id);
                    FileInfo fileImg = new FileInfo(Server.MapPath("~" + deleteImg.Image));
                    
                    string file = aFile.FileName;
                    string path = Server.MapPath("~/Content/img/MonAn/KhuyenMai-Sukien/");
                    var ac = Guid.NewGuid() + "." + file.Split('.')[1];
                    WebImage img = new WebImage(aFile.InputStream);
                    img.Resize(960, 800);
                    img.Save(path + ac);
                    if (fileImg.Exists)
                    {
                        fileImg.Delete();
                    }
                    if (deleteImg != null)
                    {
                        _db.Entry(deleteImg).State = EntityState.Detached;
                    }
                    slider.Image = "/Content/img/MonAn/KhuyenMai-Sukien/" + ac;
                }

                slider.DateCreate = DateTime.Now;
                slider.Creater = 1;
                _db.Entry(slider).State = EntityState.Modified;
                _db.SaveChanges();
                return Json(true, JsonRequestBehavior.AllowGet);
            }
            catch { return Json(false, JsonRequestBehavior.AllowGet); }
        }
    }
}