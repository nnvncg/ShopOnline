$("#loginCus").click(function (e) {   
   
    e.preventDefault();
    $.ajax({
        url: '/Accounts/SingIn',
        type: 'POST',
        dataType: 'json',
        data: {
            acc:$("#Email1").val(),
            pass :$("#Password1").val()
        },
        success: function (data) {
            if (data == 1) {
                window.location.href = $(location).attr('href');
            }
            if (data == 2) {
                alert('Tài khoản đã bị khóa hoặc chưa được kích hoạt!!')
            }
            
            if (data == 0) {
                alert('Tài khoản hoặc mật khẩu sai!!')
            }
        },
        error: function (err) {
            alert("Lỗi: Đăng nhập thất bại!");
            clear();
        }
    })

});
function clear() {
    $("#Email1").val("");
    $("#Password1").val("");
};
//js mở hình nhỏ trước khi upload
$(function () {
    $("#uploadFile").on("change", function () {
        var files = !!this.files ? this.files : [];
        if (!files.length || !window.FileReader) return; // no file selected, or no FileReader support

        if (/^image/.test(files[0].type)) { // only image file
            var reader = new FileReader(); // instance of the FileReader
            reader.readAsDataURL(files[0]); // read the local file

            reader.onloadend = function () { // set image data as background of div
                $("#imagePreview").css("background-image", "url(" + this.result + ")");
            }
        }
    });
});