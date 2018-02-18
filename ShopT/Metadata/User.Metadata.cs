using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ShopAuto.Models
{
    [MetadataTypeAttribute(typeof(UserMetadata))]
    public partial class User
    {
        internal sealed class UserMetadata
        {
            public int ID { get; set; }
            [Display(Name = "Họ")]
            [Required(ErrorMessage = "{0} không được để trống!")]
            public string FirstName { get; set; }
            [Display(Name = "Tên")]
            [Required(ErrorMessage = "{0} không được để trống!")]
            public string LastName { get; set; }
            [Display(Name = "Số điện thoại")]
            [DataType(DataType.PhoneNumber)]
            [StringLength(12, MinimumLength = 9, ErrorMessage = "{0} Số điện thoại sai!")]
            public string Phone { get; set; }
            [Display(Name = "Email")]
            [Required(ErrorMessage = "{0} không được để trống!")]
            [DataType(DataType.EmailAddress)]
            public string Email { get; set; }

            [Display(Name = "Hình đại diện")]
            public string Image { get; set; }
            [Display(Name = "Mật Khẩu")]
            [DataType(DataType.Password)]
            [StringLength(40, MinimumLength = 6, ErrorMessage = "{0} Mật khẩu dài từ 6 đến 20 ký tự!")]
            public string Password { get; set; }
            [Display(Name = "Địa chỉ")]
            public string Addess { get; set; }
            [Display(Name = "Loại tài khoản")]
            public Nullable<int> TypeAcc { get; set; }
            [Display(Name = "Ngày tạo")]
            [DataType(DataType.DateTime)]
            public Nullable<System.DateTime> CreateDate { get; set; }
            [Display(Name = "Kích hoạt")]
            public Nullable<bool> Active { get; set; }
        }
    }
}
