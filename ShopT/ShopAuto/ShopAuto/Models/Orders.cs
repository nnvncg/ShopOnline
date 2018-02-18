using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShopAuto.Models
{
    public class Orders
    {
        ShopOnlineEntities _db = new ShopOnlineEntities();
        public int ProId { get; set; }
        public string ProName { get; set; }
        public string ProImage { get; set; }
        public int ProQuantity { get; set; }
        public double ProPrice { get; set; }
        public double ProIntoMoney { get { return ProQuantity * ProPrice; } }
        public Orders(int Id)
        {
            ProId = Id;
            Product _prod = _db.Products.Single(n => n.ID == ProId);
            if (_prod.Quantity > 0)
            {
                ProName = _prod.ProductName;
                ProQuantity = 1;
                ProPrice = double.Parse(_prod.Price.ToString());
                ProImage = _prod.Image;
            }
            
        }
    }
}