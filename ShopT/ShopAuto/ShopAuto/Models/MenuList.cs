//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ShopAuto.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class MenuList
    {
        public int ID { get; set; }
        public string MenuName { get; set; }
        public string URLMenu { get; set; }
        public Nullable<int> Order { get; set; }
        public Nullable<System.DateTime> CreateDate { get; set; }
        public Nullable<int> Creator { get; set; }
    }
}
