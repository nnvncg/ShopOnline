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
    
    public partial class User
    {
        public int ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Image { get; set; }
        public string Password { get; set; }
        public string Addess { get; set; }
        public Nullable<int> TypeAcc { get; set; }
        public Nullable<System.DateTime> CreateDate { get; set; }
        public Nullable<bool> Active { get; set; }
        public Nullable<int> CodeReset { get; set; }
    
        public virtual UserGroup UserGroup { get; set; }
    }
}