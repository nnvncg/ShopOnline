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
    
    public partial class BillDetail
    {
        public int IdBill { get; set; }
        public int IdProduct { get; set; }
        public Nullable<int> Quantity { get; set; }
        public Nullable<double> Price { get; set; }
    
        public virtual Bill Bill { get; set; }
    }
}
