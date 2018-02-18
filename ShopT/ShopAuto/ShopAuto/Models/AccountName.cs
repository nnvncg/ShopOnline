using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShopAuto.Models
{
    public class AccountName
    {
        ShopOnlineEntities _db = new ShopOnlineEntities();
        public int AccID { get; set; }
        public string AccName { get; set; }

        public AccountName(int Id)
        {
            AccID = Id;
            User _user = _db.Users.Single(n => n.ID == AccID);
            AccName = _user.FirstName + " " + _user.LastName;
        }
    }
}