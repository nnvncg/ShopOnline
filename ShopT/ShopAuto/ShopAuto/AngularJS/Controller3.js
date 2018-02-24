/// <reference path="../scripts/angular.min.js" />
myCntr.controller("Layout", function ($scope, $http, $window) {
    //phan quyen
    $http(
        {
            method: "POST",
            url: "/GroupUser/checkAuthorities",
            dataType: 'json',
            data: { Authorities: "5" }
        }).then(function (response) {
            if (response.data) {
                $scope.CheckAutViewMenu = false;
            }
            else {
                $scope.CheckAutViewMenu = true;
            }
        })
    $http(
        {
            method: "POST",
            url: "/GroupUser/checkAuthorities",
            dataType: 'json',
            data: { Authorities: "12" }
        }).then(function (response) {
            if (response.data) {
                $scope.CheckAutViewCmt = false;
            }
            else {
                $scope.CheckAutViewCmt = true;
            }
        })
    $http(
        {
            method: "POST",
            url: "/GroupUser/checkAuthorities",
            dataType: 'json',
            data: { Authorities: "17" }
        }).then(function (response) {
            if (response.data) {
                $scope.CheckAutViewInfWeb = false;
            }
            else {
                $scope.CheckAutViewInfWeb = true;
            }
        })
    $http(
        {
            method: "POST",
            url: "/GroupUser/checkAuthorities",
            dataType: 'json',
            data: { Authorities: "19" }
        }).then(function (response) {
            if (response.data) {
                $scope.CheckAutViewProd = false;
            }
            else {
                $scope.CheckAutViewProd = true;
            }
        })
    $http(
        {
            method: "POST",
            url: "/GroupUser/checkAuthorities",
            dataType: 'json',
            data: { Authorities: "26" }
        }).then(function (response) {
            if (response.data) {
                $scope.CheckAutViewGroup = false;
            }
            else {
                $scope.CheckAutViewGroup = true;
            }
        })
    $http(
        {
            method: "POST",
            url: "/GroupUser/checkAuthorities",
            dataType: 'json',
            data: { Authorities: "35" }
        }).then(function (response) {
            if (response.data) {
                $scope.CheckAutViewSlider = false;
            }
            else {
                $scope.CheckAutViewSlider = true;
            }
        })
    $http(
        {
            method: "POST",
            url: "/GroupUser/checkAuthorities",
            dataType: 'json',
            data: { Authorities: "14" }
        }).then(function (response) {
            if (response.data) {
                $scope.CheckAutViewContact = false;
            }
            else {
                $scope.CheckAutViewContact = true;
            }
        })
    //
    $http({
        method: "get",
        url: "/AccountAdmin/CheckLogIn"
    }).then(function (response) {
        if (!response.data) {
            $window.location.href = '/AccountAdmin/Login';
        }
    })
    $http({
        method: "get",
        url: "/ShopInformtionAdmin/DataInformation"
    }).then(function (response) {
        $scope.dataLayout = response.data;
    })
    $http({
        method: "get",
        url: "/AccountAdmin/NameAccountCurrent"
    }).then(function (response) {
        $scope.dataAccountCurrent = response.data;
    })
});
//các trang admin 2
myCntr.controller("SliderStatus", function ($scope, $http, Upload, $notify, $window) {
    $scope.ViewAccount = function (id) {
        $window.open('/AccountAdmin/AccountDetail/' + id);
    }
    $http(
        {
            method: "POST",
            url: "/GroupUser/checkAuthorities",
            dataType: 'json',
            data: { Authorities: "24" }
        }).then(function (response) {
            if (response.data) {
                $scope.CheckAutViewDetailAcc = false;
            }
            else {
                $scope.CheckAutViewDetailAcc = true;

            }
        })
    $http(
        {
            method: "POST",
            url: "/GroupUser/checkAuthorities",
            dataType: 'json',
            data: { Authorities: "31" }
        }).then(function (response) {
            if (response.data) {
                $scope.CheckAutAdd = false;
            }
            else {
                $scope.CheckAutAdd = true;
            }
        })
    $http(
        {
            method: "POST",
            url: "/GroupUser/checkAuthorities",
            dataType: 'json',
            data: { Authorities: "32" }
        }).then(function (response) {
            if (response.data) {
                $scope.CheckAutView = false;
            }
            else {
                $scope.CheckAutView = true;
            }
        })
    $http(
        {
            method: "POST",
            url: "/GroupUser/checkAuthorities",
            dataType: 'json',
            data: { Authorities: "33" }
        }).then(function (response) {
            if (response.data) {
                $scope.CheckAutDelete = false;
            }
            else {
                $scope.CheckAutDelete = true;
            }
        })
    $http(
        {
            method: "POST",
            url: "/GroupUser/checkAuthorities",
            dataType: 'json',
            data: { Authorities: "30" }
        }).then(function (response) {
            if (response.data) {
                $scope.CheckAutEdit = false;
            }
            else {
                $scope.CheckAutEdit = true;
            }
        })
    $scope.pageSize = 5;
    $scope.selectedPage = 1;
    account();
    GetAll();
    $scope.selectPage = function (page) {
        $scope.selectedPage = page;
    }
    $scope.toPage = function (page) {
        $scope.selectedPage = page;
    }
    $scope.goToPrev = function () {
        if ($scope.selectedPage > 1)
            $scope.selectedPage--;
    }
    $scope.goToNext = function (page) {
        if ($scope.data != null) {
            if ($scope.selectedPage < $scope.data.length)
                $scope.selectedPage++;
        }

    }
    $scope.PagePrevActive = function () {
        return $scope.selectedPage == 1 ? 'ng-hide' : 'ng-show';
    }
    $scope.PageNextActive = function (page) {
        if ($scope.data != null) {
            return $scope.selectedPage == $scope.data.length ? 'ng-hide' : 'ng-show';
        }
        return 'ng-hide';
    }
    $scope.PageActive = function (page) {
        if ($scope.data.length == 1) {
            return $scope.selectedPage == page ? 'ng-hide' : '';
        }
        else {

            return $scope.selectedPage == page ? 'btn-danger' : '';
        }
    }
    function GetAll() {
        $http(
            {
                method: "Get",
                url: "/SliderAdmin/ListSlider"
            }).then(function (response) {
                if (response.data == "") {
                    $scope.dataSlider = "";
                }
                else {
                    $scope.dataSlider = response.data;
                }
            }
            )
    }
    function account() {
        $http(
            {
                method: "GET",
                url: "/AccountAdmin/AllAccount"
            }).then(function (response) {
                $scope.accountAll = response.data;
            })
    }

    $scope.ModalDetail = function (id) {
        $scope.DetailHide = false;
        $scope.DeleteHide = true;
        $scope.AddHide = true;

        $scope.EditHide = true;
        $http(
            {
                method: "POST",
                url: "/SliderAdmin/SliderDetail",
                dataType: 'json',
                data: {
                    id: id
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                $scope.dataDetail = response.data;
            })
    }
    $scope.ModalEdit = function (id) {
        $scope.DetailHide = true;
        $scope.DeleteHide = true;
        $scope.AddHide = true;
        $scope.EditHide = false;
        $http(
            {
                method: "POST",
                url: "/SliderAdmin/SliderDetail",
                dataType: 'json',
                data: {
                    id: id
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                $scope.dataEdit = response.data;
            })
    }

    $scope.clear = function () {
        $scope.dataEdit = null;
        $scope.dataDelete = null;
        $scope.dataDetail = null;
        $scope.Slider = null;
        $scope.DetailHide = true;
        $scope.DeleteHide = true;
        $scope.AddHide = true; $scope.EditHide = true;
    }
    $scope.AddSlider = function () {
        $scope.DetailHide = true;
        $scope.DeleteHide = true;
        $scope.AddHide = false;
        $scope.EditHide = true;
    }
    $scope.ModalDelete = function (id) {
        $scope.DetailHide = true;
        $scope.DeleteHide = false;
        $scope.AddHide = true; $scope.EditHide = true;
        $http(
            {
                method: "POST",
                url: "/SliderAdmin/SliderDetail",
                dataType: 'json',
                data: {
                    id: id
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                $scope.dataDelete = response.data;
            })
    }
    $scope.ApplyDelete = function (id) {
        $http(
            {
                method: "POST",
                url: "/SliderAdmin/SliderRemove",
                dataType: 'json',
                data: {
                    id: id
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data) {
                    GetAll();
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Xóa trình chiếu', 'Xóa trình chiếu thành công!');
                    $scope.clear;
                }
                else {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.error('Xóa trình chiếu', 'Xóa trình chiếu thất bại!');
                }
            })
    }
    $scope.ApplyAdd = function (file) {
        slider = $scope.Slider;
        file.upload = Upload.upload({
            url: '/SliderAdmin/SliderAdd',
            data: { slider, aFile: file },
        }).then(function (response) {
            if (response.data) {
                GetAll();
                $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                $notify.setPosition('bottom-left');
                $notify.success('Thêm trình chiếu', 'Thêm trình chiếu thành công!'); $scope.clear;
            }
            else {
                $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                $notify.setPosition('bottom-left');
                $notify.error('Thêm trình chiếu', 'Thêm trình chiếu thất bại!');
            }
        })
    }
    $scope.ApplyEdit = function (file) {
        slider = $scope.dataEdit;
        file.upload = Upload.upload({
            url: '/SliderAdmin/SliderEdit',
            data: { slider, aFile: file },
        }).then(function (response) {
            if (response.data) {
                GetAll();
                $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                $notify.setPosition('bottom-left');
                $notify.success('Sửa trình chiếu', 'Sửa trình chiếu thành công!');
                $scope.clear;
                $scope.Image = null;
            }
            else {
                $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                $notify.setPosition('bottom-left');
                $notify.error('Sửa trình chiếu', 'Sửa trình chiếu thất bại!');
            }
        })
    }
    $scope.Activce = function (id) {
        $http(
            {
                method: "POST",
                url: "/SliderAdmin/SliderActive",
                dataType: 'json',
                data: {
                    id: id
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                GetAll();
            })
    }
    //phần cho ckediter
    $scope.options = {
        language: 'en',
        allowedContent: true,
        entities: false
    };
    $scope.onReady = function () {
        // ... 
    };

});
//*
myCntr.controller("InformationStatus", function ($scope, $http, Upload, $notify, $sce) {
    //xet quyeen
    $http(
        {
            method: "POST",
            url: "/GroupUser/checkAuthorities",
            dataType: 'json',
            data: { Authorities: "18" }
        }).then(function (response) {
            if (response.data) {
                $scope.CheckEditInfor = false;
            }
            else {
                $scope.CheckEditInfor = true;
            }
        })
    //
    function GetAll() {
        $http(
            {
                method: "GET",
                url: "/ShopInformtionAdmin/DataInformation"
            }).then(function (response) {
                $scope.data = response.data;
                $scope.data2 = response.data;
                //làm việc với iframe -->map google
                $scope.Map = $sce.trustAsResourceUrl($scope.data.URLMap);
            })
    }
    GetAll();
    $scope.options = {
        language: 'en',
        allowedContent: true,
        entities: false
    };
    $scope.onReady = function () {
        // ... 
    };
    Clear();

    function Clear() {
        $scope.IntroduceHide = true;
        $scope.ContactHide = true;
        $scope.Contact2Hide = true;
    }
    $scope.Introduce = function () {
        Clear();
        $scope.IntroduceHide = false;
    }
    $scope.Contact = function () {
        Clear();
        $scope.ContactHide = false;
    }
    $scope.Contact2 = function () {
        Clear();
        $scope.Contact2Hide = false;
    }
    // Called when the editor is completely ready. 

    $scope.Clear = function () {
        Clear();
    }
    $scope.IntroduceSave = function (file) {
        $http(
            {
                method: "POST",
                url: "/ShopInformtionAdmin/Edit1",
                dataType: 'json',
                data: {
                    aFile: file,
                    name: $scope.data2.NameShop,
                    address: $scope.data2.AddressShop,
                    about: $scope.data2.About
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data) {
                    GetAll();
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Sửa thông tin', 'Sửa thông tin thành công!');
                    $scope.Clear;
                }
                else {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.error('Sửa thông tin', 'Sửa thông tin thất bại!');
                }
            })
    }
    $scope.ContactSave = function () {
        $http(
            {
                method: "POST",
                url: "/ShopInformtionAdmin/Edit2",
                dataType: 'json',
                data: {
                    phone: $scope.data2.Phone,
                    phone2: $scope.data2.Phone2,
                    email: $scope.data2.Email,
                    bankAcc: $scope.data2.BankAcc,
                    password: $scope.data2.PassWordEmail
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data) {
                    GetAll();
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Sửa thông tin', 'Sửa thông tin thành công!');
                    $scope.Clear;
                }
                else {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.error('Sửa thông tin', 'Sửa thông tin thất bại!');
                }
            })
    }
    $scope.Contact2Save = function () {
        $http(
            {
                method: "POST",
                url: "/ShopInformtionAdmin/Edit3",
                dataType: 'json',
                data: {
                    faceBook: $scope.data2.FaceBook,
                    google: $scope.data2.Google,
                    zalo: $scope.data2.Zalo
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data) {
                    GetAll();
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Sửa thông tin', 'Sửa thông tin thành công!');
                    $scope.Clear;
                }
                else {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.error('Sửa thông tin', 'Sửa thông tin thất bại!');
                }
            })

    }
    $scope.SaveMap = function () {
        $http(
            {
                method: "POST",
                url: "/ShopInformtionAdmin/Edit4",
                dataType: 'json',
                data: {
                    map: $scope.Map
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data) {
                    GetAll();
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Sửa thông tin', 'Sửa thông tin thành công!');
                    $scope.Clear;
                }
                else {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.error('Sửa thông tin', 'Sửa thông tin thất bại!');
                }
            })
    }
    $scope.ApplyKeywords = function () {
        $http(
            {
                method: "POST",
                url: "/ShopInformtionAdmin/Edit5",
                dataType: 'json',
                data: {
                    keyword: $scope.Keywords
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data) {
                    GetAll();
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Sửa thông tin', 'Sửa thông tin thành công!');
                    $scope.Clear;
                }
                else {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.error('Sửa thông tin', 'Sửa thông tin thất bại!');
                }
            })
    }
});
myCntr.controller("CategoryAdmin", function ($scope, $http, Upload, $notify, $window) {
    $scope.ViewAccount = function (id) {
        $window.open('/AccountAdmin/AccountDetail/'+id);
    }
    $http(
        {
            method: "POST",
            url: "/GroupUser/checkAuthorities",
            dataType: 'json',
            data: { Authorities: "24" }
        }).then(function (response) {
            if (response.data) {
                $scope.CheckAutViewDetailAcc = false;
            }
            else {
                $scope.CheckAutViewDetailAcc = true;

            }
        })
    $http(
        {
            method: "POST",
            url: "/GroupUser/checkAuthorities",
            dataType: 'json',
            data: { Authorities: "9" }
        }).then(function (response) {
            if (response.data) {
                $scope.CheckAutAdd = false;
            }
            else {
                $scope.CheckAutAdd = true;
            }
        })
    $http(
        {
            method: "POST",
            url: "/GroupUser/checkAuthorities",
            dataType: 'json',
            data: { Authorities: "100" }
        }).then(function (response) {
            if (response.data) {
                $scope.CheckAutView = false;
            }
            else {
                $scope.CheckAutView = true;
            }
        })
    $http(
        {
            method: "POST",
            url: "/GroupUser/checkAuthorities",
            dataType: 'json',
            data: { Authorities: "10" }
        }).then(function (response) {
            if (response.data) {
                $scope.CheckAutDelete = false;
            }
            else {
                $scope.CheckAutDelete = true;
            }
        })
    $http(
        {
            method: "POST",
            url: "/GroupUser/checkAuthorities",
            dataType: 'json',
            data: { Authorities: "11" }
        }).then(function (response) {
            if (response.data) {
                $scope.CheckAutEdit = false;
            }
            else {
                $scope.CheckAutEdit = true;
            }
        })
    $scope.pageSize = 4;
    $scope.selectedPage = 1;
    account();
    GetAll();
    $scope.selectPage = function (page) {
        $scope.selectedPage = page;
    }
    $scope.toPage = function (page) {
        $scope.selectedPage = page;
    }
    $scope.goToPrev = function () {
        if ($scope.selectedPage > 1)
            $scope.selectedPage--;
    }
    $scope.goToNext = function (page) {
        if ($scope.data != null) {
            if ($scope.selectedPage < $scope.data.length)
                $scope.selectedPage++;
        }

    }
    $scope.PagePrevActive = function () {
        return $scope.selectedPage == 1 ? 'ng-hide' : 'ng-show';
    }
    $scope.PageNextActive = function (page) {
        if ($scope.data != null) {
            return $scope.selectedPage == $scope.data.length ? 'ng-hide' : 'ng-show';
        }
        return 'ng-hide';
    }
    $scope.PageActive = function (page) {
        if ($scope.data.length == 1) {
            return $scope.selectedPage == page ? 'ng-hide' : '';
        }
        else {

            return $scope.selectedPage == page ? 'btn-danger' : '';
        }
    }
    function GetAll() {
        $http(
            {
                method: "Get",
                url: "/CategoryAdmin/CategoryAll"
            }).then(function (response) {
                if (response.data == "") {
                    $scope.dataCategory = "";
                }
                else {
                    $scope.dataCategory = response.data;
                }
            }
            )
    }
    function account() {
        $http(
            {
                method: "GET",
                url: "/AccountAdmin/AllAccount"
            }).then(function (response) {
                $scope.accountAll = response.data;
            })
    }
    Clear();
    function Clear() {
        $scope.DeleteHide = true;
        $scope.DetailHide = true;
        $scope.EditHide = true;
        $scope.AddHide = true;
    }
    $scope.Clear = function () {
        Clear();
    }
    $scope.checkStatus = function (id) {
        $http(
            {
                method: "POST",
                url: "/CategoryAdmin/Active",
                dataType: 'json',
                data: {
                    id: id
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data) {
                    GetAll();
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Trạng thái ', 'Sửa trạng thái thành công!');
                }
            })
    }
    $scope.DeleteCategorytAd = function (id) {
        Clear();
        $scope.DeleteHide = false;
        $http(
            {
                method: "POST",
                url: "/CategoryAdmin/CategoryById",
                dataType: 'json',
                data: {
                    id: id
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                $scope.dataDelete = response.data;
            })
    }
    $scope.EditCategorytAd = function (id) {
        Clear();

        $scope.EditHide = false;
        $http(
            {
                method: "POST",
                url: "/CategoryAdmin/CategoryById",
                dataType: 'json',
                data: {
                    id: id
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                $scope.dataEdit = response.data;
            })
    }
    $scope.DetailCategorytAd = function (id) {
        Clear();
        $scope.DetailHide = false;
        $http(
            {
                method: "POST",
                url: "/CategoryAdmin/CategoryById",
                dataType: 'json',
                data: {
                    id: id
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                $scope.dataDetail = response.data;
            })
    }
    $scope.AddCategory = function () {
        Clear();
        $scope.AddHide = false;
        $scope.dataAdd = null;
    }
    $scope.ApplyDelete = function (id) {

        $http(
            {
                method: "POST",
                url: "/CategoryAdmin/Remove",
                dataType: 'json',
                data: {
                    id: id
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data) {
                    GetAll();
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Xóa loại sản phẩm', 'Xóa loại sản phẩm thành công!');
                }
                else {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.error('Xóa loại sản phẩm', 'Xóa loại sản phẩm thất bại!');
                }
            })
    }
    $scope.ApplyEdit = function () {
        category = $scope.dataEdit;
        $http(
            {
                method: "POST",
                url: "/CategoryAdmin/Edit",
                dataType: 'json',
                data: {
                    category
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data) {
                    GetAll();
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Sửa loại sản phẩm', 'Sửa loại sản phẩm thành công!');
                }
                else {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.error('Sửa loại sản phẩm', 'Sửa loại sản phẩm thất bại!');
                }
            })
    }
    $scope.ApplyAdd = function () {
        category = $scope.dataAdd;
        $http(
            {
                method: "POST",
                url: "/CategoryAdmin/Add",
                dataType: 'json',
                data: {
                    category
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data) {
                    GetAll();
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Thêm loại sản phẩm', 'Thêm loại sản phẩm thành công!');
                }
                else {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.error('Thêm loại sản phẩm', 'Thêm loại sản phẩm thất bại!');
                }
            })
    }
    $scope.options = {
        language: 'en',
        allowedContent: true,
        entities: false
    };
    $scope.onReady = function () {
        // ... 
    };
});
myCntr.controller("CommentAdmin", function ($scope, $http, Upload, $notify, $window) {
    $scope.ViewAccount = function (id) {
        $window.open('/AccountAdmin/AccountDetail/' + id);
    }
    $http(
        {
            method: "POST",
            url: "/GroupUser/checkAuthorities",
            dataType: 'json',
            data: { Authorities: "24" }
        }).then(function (response) {
            if (response.data) {
                $scope.CheckAutViewDetailAcc = false;
            }
            else {
                $scope.CheckAutViewDetailAcc = true;

            }
        })
    $http(
        {
            method: "POST",
            url: "/GroupUser/checkAuthorities",
            dataType: 'json',
            data: { Authorities: "12" }
        }).then(function (response) {
            if (response.data) {
                $scope.CheckAutView = false;
            }
            else {
                $scope.CheckAutView = true;
            }
        })
    $http(
        {
            method: "POST",
            url: "/GroupUser/checkAuthorities",
            dataType: 'json',
            data: { Authorities: "13" }
        }).then(function (response) {
            if (response.data) {
                $scope.CheckAutDelete = false;
            }
            else {
                $scope.CheckAutDelete = true;
            }
        })

    $scope.pageSize = 3;
    $scope.selectedPage = 1;
    $scope.pageSize1 = 3;
    $scope.selectedPage1 = 1;

    $scope.ViewComment = "1";

    $scope.selectPage = function (page) {
        $scope.selectedPage = page;
    }
    $scope.toPage = function (page) {
        $scope.selectedPage = page;
    }
    $scope.goToPrev = function () {
        if ($scope.selectedPage > 1)
            $scope.selectedPage--;
    }
    $scope.goToNext = function (page) {
        if ($scope.data != null) {
            if ($scope.selectedPage < $scope.data.length)
                $scope.selectedPage++;
        }

    }
    $scope.PagePrevActive = function () {
        return $scope.selectedPage == 1 ? 'ng-hide' : 'ng-show';
    }
    $scope.PageNextActive = function (page) {
        if ($scope.data != null) {
            return $scope.selectedPage == $scope.data.length ? 'ng-hide' : 'ng-show';
        }
        return 'ng-hide';
    }
    $scope.test = function (page) {
        if ($scope.selectedPage - 1 > page || $scope.selectedPage + 1 < page) {
            return true;
        }
        else return false;
    }
    $scope.PageActive = function (page) {

        if ($scope.data.length == 1) {
            return $scope.selectedPage == page ? 'ng-hide' : '';
        }
        else {

            return $scope.selectedPage == page ? 'btn-danger' : '';
        }
    }

    //phaan trang 2
    $scope.selectPage1 = function (page) {
        $scope.selectedPage1 = page;
    }
    $scope.toPage1 = function (page) {
        $scope.selectedPage1 = page;
    }
    $scope.goToPrev1 = function () {
        if ($scope.selectedPage1 > 1)
            $scope.selectedPage1--;
    }
    $scope.goToNext1 = function (page) {
        if ($scope.data2 != null) {
            if ($scope.selectedPage1 < $scope.data2.length)
                $scope.selectedPage1++;
        }

    }
    $scope.PagePrevActive1 = function () {
        return $scope.selectedPage1 == 1 ? 'ng-hide' : 'ng-show';
    }
    $scope.PageNextActive1 = function (page) {
        if ($scope.data2 != null) {
            return $scope.selectedPage1 == $scope.data2.length1 ? 'ng-hide' : 'ng-show';
        }
        return 'ng-hide';
    }
    $scope.PageActive1 = function (page) {

        if ($scope.data2.length == 1) {
            return $scope.selectedPage1 == page ? 'ng-hide' : '';
        }
        else {

            return $scope.selectedPage1 == page ? 'btn-danger' : '';
        }
    }
    account();
    function account() {
        $http(
            {
                method: "GET",
                url: "/AccountAdmin/AllAccount"
            }).then(function (response) {
                $scope.accountAll = response.data;
            })
    }

    GetAllStatus();
    function GetAllStatus() {
        $http(
            {
                method: "Get",
                url: "/StatusBill/ListStatus"
            }).then(function (response) {
                if (response.data == "") {
                    $scope.dataOrder = "";
                }
                else {
                    $scope.message = "";
                    $scope.dataStatus = response.data;
                }
            })
    }
    $scope.Hide = true;
    $scope.ProdById = function (id) {
        $http(
            {
                method: "POST",
                url: "/CommentAdmin/UpdateView",
                data: { id: id }
            }).then(function (response) {
                if ($scope.ViewComment == "1") {
                    CommentNew();
                }
                $scope.idProd = response.data;
            }
            )
        $scope.dataCmtByProd = null;
        $http(
            {
                method: "POST",
                url: "/ProductAdmin/ListProductById",
                data: { id: $scope.idProd }
            }).then(function (response) {
                if (response.data == "") {
                    $scope.data1 = "";
                }
                else {
                    $scope.data1 = response.data;
                    $http(
                        {
                            method: "POST",
                            url: "/CommentAdmin/CommentByProd",
                            data: { idProd: $scope.data1.ID }
                        }).then(function (response) {
                            if (response.data == "") {
                                data1.ProductName = "Không có bình luận nào";
                                $scope.dataCmtByProd = "";
                                $scope.Hide = true;
                            }
                            else {
                                $scope.Hide = false;
                                $scope.dataCmtByProd = response.data;
                            }
                        })
                }
            })
    }
    CommentNew();
    $scope.reply = function (prodId) {
        $http(
            {
                method: "POST",
                url: "/CommentAdmin/NewCmt",
                data: {
                    idProd: prodId,
                    cmt: $scope.replyComment
                }
            }).then(function (response) {
                if (!response.data) {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.error('Trả lời', 'không trả lời được cho bình luận!');
                }
                else {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Trả lời', 'Đã trả lời bình luận!');
                    $http(
                        {
                            method: "POST",
                            url: "/CommentAdmin/CommentByProd",
                            data: { idProd: response.data }
                        }).then(function (response) {
                            if (response.data == "") {
                                data1.ProductName = "Không có bình luận nào";
                                $scope.dataCmtByProd = "";
                                $scope.Hide = true;
                            }
                            else {
                                $scope.Hide = false;
                                $scope.dataCmtByProd = response.data;
                            }
                        })
                }
            })
    }
    function checkOrderby(orderBy) {
        switch (orderBy) {
            case "1":
                CommentNew();
                break;
            case "2":
                CommentAll();
                break;
            case "3":
                CommentInDate();
                break;
            case "4":
                CommentInWeek();
                break;
            case "5":
                CommentInMonth();
                break;
        }
    }
    $scope.ChangeCommt = function (ViewComment1) {
        checkOrderby(ViewComment1);
    }
    function CommentAll() {
        $http(
            {
                method: "Get",
                url: "/CommentAdmin/All",
            }).then(function (response) {
                $scope.dataComment = response.data;
            })
    }
    $scope.IdDelete = null;
    $scope.delteCmt = function (id) {
        $scope.IdDelete = id;
    }
    $scope.ApllyDelete = function () {
        $http(
            {
                method: "POST",
                url: "/CommentAdmin/Delete",
                data: { id: $scope.IdDelete }
            }).then(function (response) {
                if (response.data != false) {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Xóa bình luận', 'Đã xóa bình luận!');

                    checkOrderby($scope.ViewComment);
                    $http(
                        {
                            method: "POST",
                            url: "/CommentAdmin/CommentByProd",
                            data: { idProd: response.data }
                        }).then(function (response) {
                            if (response.data == "") {
                                $scope.dataCmtByProd = "";
                                $scope.Hide = true;
                            }
                            else {
                                $scope.Hide = false;
                                $scope.dataCmtByProd = response.data;
                            }
                        })
                }
                else {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.error('Xóa bình luận', 'Không xóa được bình luận!');
                }
            })
    }
    function CommentNew() {
        $http(
            {
                method: "GET",
                url: "/CommentAdmin/Seem"
            }).then(function (response) {
                $scope.dataComment = response.data;
            })
    }
    function CommentInDate() {
        $http(
            {
                method: "Get",
                url: "/CommentAdmin/InDate",
            }).then(function (response) {
                $scope.dataComment = response.data;
            })
    }
    function CommentInWeek() {
        $http(
            {
                method: "Get",
                url: "/CommentAdmin/InWeek",
            }).then(function (response) {
                $scope.dataComment = response.data;
            })
    }
    function CommentInMonth() {
        $http(
            {
                method: "Get",
                url: "/CommentAdmin/InMonth",
            }).then(function (response) {
                $scope.dataComment = response.data;
            })
    }
});
myCntr.controller("ContactAdmin", function ($scope, $http, Upload, $notify) {
    $http(
        {
            method: "POST",
            url: "/GroupUser/checkAuthorities",
            dataType: 'json',
            data: { Authorities: "14" }
        }).then(function (response) {
            if (response.data) {
                $scope.CheckAutReply = false;
            }
            else {
                $scope.CheckAutReply = true;

            }
        })
    $http(
        {
            method: "POST",
            url: "/GroupUser/checkAuthorities",
            dataType: 'json',
            data: { Authorities: "15" }
        }).then(function (response) {
            if (response.data) {
                $scope.CheckAutDelete = false;
            }
            else {
                $scope.CheckAutDelete = true;
            }
        })

    $scope.pageSize = 6;
    $scope.selectedPage = 1;
    $scope.selectPage = function (page) {
        $scope.selectedPage = page;
    }
    $scope.toPage = function (page) {
        $scope.selectedPage = page;
    }
    $scope.goToPrev = function () {
        if ($scope.selectedPage > 1)
            $scope.selectedPage--;
    }
    $scope.goToNext = function (page) {
        if ($scope.data != null) {
            if ($scope.selectedPage < $scope.data.length)
                $scope.selectedPage++;
        }

    }
    $scope.PagePrevActive = function () {
        return $scope.selectedPage == 1 ? 'ng-hide' : 'ng-show';
    }
    $scope.PageNextActive = function (page) {
        if ($scope.data != null) {
            return $scope.selectedPage == $scope.data.length ? 'ng-hide' : 'ng-show';
        }
        return 'ng-hide';
    }
    $scope.test = function (page) {
        if ($scope.selectedPage - 1 > page || $scope.selectedPage + 1 < page) {
            return true;
        }
        else return false;
    }
    $scope.PageActive = function (page) {

        if ($scope.data.length == 1) {
            return $scope.selectedPage == page ? 'ng-hide' : '';
        }
        else {

            return $scope.selectedPage == page ? 'btn-danger' : '';
        }
    }
    all();
    function all() {
        $scope.int = 1;
        $http(
            {
                method: "GET",
                url: "/ContactAdmin/All"
            }).then(function (response) {
                if (response.data == "") {
                }
                else {
                    $scope.Hide = false;
                    $scope.dataContact = response.data;
                }
            })
    }
    $scope.reply = function (id) {

        $http(
            {
                method: "Post",
                url: "/ContactAdmin/ContactById",
                data: { id: id }
            }).then(function (response) {
                if (response.data == "") {
                }
                else {
                    $scope.dataCont = response.data;
                    $http(
                        {
                            method: "Post",
                            url: "/ContactAdmin/Status",
                            data: { id: id }
                        }).then(function (response) {
                            if (response.data) {
                                all();
                            }
                        })
                }
            })
    }
    $scope.checkDate = function () {
        $scope.int = 2;
        ContByDate();
    }
    function ContByDate() {
        $http(
            {
                method: "Post",
                url: "/ContactAdmin/ContactByDate",
                data: { date: $scope.date1 }
            }).then(function (response) {
                if (response.data == "") {

                    $scope.dataContact = null;
                }
                else {
                    $scope.dataContact = response.data;
                }
            })
    }
    $scope.remove = function (id) {
        $http(
            {
                method: "Post",
                url: "/ContactAdmin/ContactById",
                data: { id: id }
            }).then(function (response) {
                if (response.data == "") {
                }
                else {
                    $scope.dataDelete = response.data;
                }
            })
    }
    $scope.All = function () {
        all();
    }
    $scope.seen = function () {
        $scope.int = 3;
        $http(
            {
                method: "GET",
                url: "/ContactAdmin/Seen"
            }).then(function (response) {
                if (response.data == "") {
                    $scope.dataContact = null;
                }
                else {
                    $scope.dataContact = response.data;
                }
            })
    }
    $scope.Delete = function (id) {
        $http(
            {
                method: "Post",
                url: "/ContactAdmin/remove",
                data: { id: id }
            }).then(function (response) {
                if (response.data) {
                    if ($scope.int == 1) {
                        all();
                    }
                    if ($scope.int == 2) {
                        ContByDate();
                    }

                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Xóa', 'Đã xóa thành công!');
                }
                else {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.error('Xóa', 'Đã xóa thất bại!');
                }
            })
    }
    Clear();
    function Clear() {
        $scope.TitleMail = null;
        $scope.Content = null;
    }
    $scope.Clear = function () {
        Clear();
    }
    $scope.SendEmail = function (id) {
        $http(
            {
                method: "Post",
                url: "/ContactAdmin/sendEmail",
                data: {
                    title: $scope.TitleMail,
                    content: $scope.Content,
                    id: id
                }
            }).then(function (response) {
                if (response.data) {
                    Clear();
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Gửi email', 'Đã gửi email thành công!');
                }
                else {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.error('Gửi email', 'Đã gửi email thất bại!');
                }
            })
    }
});
myCntr.controller("AccountAdmin", function ($scope, $http, Upload, $notify, $window) {
    $scope.pageSize = 3;
    $scope.selectedPage = 1;
    $scope.selectPage = function (page) {
        $scope.selectedPage = page;
    }
    $scope.toPage = function (page) {
        $scope.selectedPage = page;
    }
    $scope.goToPrev = function () {
        if ($scope.selectedPage > 1)
            $scope.selectedPage--;
    }
    $scope.goToNext = function (page) {
        if ($scope.data != null) {
            if ($scope.selectedPage < $scope.data.length)
                $scope.selectedPage++;
        }
    }
    $scope.PagePrevActive = function () {
        return $scope.selectedPage == 1 ? 'ng-hide' : 'ng-show';
    }
    $scope.PageNextActive = function (page) {
        if ($scope.data != null) {
            return $scope.selectedPage == $scope.data.length ? 'ng-hide' : 'ng-show';
        }
        return 'ng-hide';
    }
    $scope.PageActive = function (page) {
        if ($scope.data.length == 1) {
            return $scope.selectedPage == page ? 'ng-hide' : '';
        }
        else {
            return $scope.selectedPage == page ? 'btn-danger' : '';
        }
    }
    $scope.userHide = true;
    $scope.AllHide = true;
    user();
    $scope.userHide = false;
    function user() {
        $scope.SearchHide = true;
        $http(
            {
                method: "get",
                url: "/AccountAdmin/AccById",

            }).then(function (response) {
                $scope.dataUser = response.data;
            })
    }
    $scope.changeTypeUser = function (id, type) {
        if (type != "") {
            $http(
                {
                    method: "POST",
                    url: "/AccountAdmin/ChangeTypeAcc",
                    dataType: 'json',
                    data: {
                        id: id,
                        type: type
                    },
                    headers: { "Content-Type": "application/json" }
                }).then(function (response) {
                    if (response.data) {
                        all()
                        $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                        $notify.setPosition('bottom-left');
                        $notify.success('Đổi loại tài khoản', 'Đổi loại tài khoản thành công!'); $scope.clear;
                    }
                    else {
                        $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                        $notify.setPosition('bottom-left');
                        $notify.success('Đổi loại tài khoản', 'Đổi loại tài khoản thất bại!'); $scope.clear;
                    }
                })
        }

    }
    $scope.SearchHide = true;
    $scope.AddHide = true;
    $scope.ChangeActive2 = function (id) {
        $http(
            {
                method: "POST",
                url: "/AccountAdmin/ChangeActive",
                dataType: 'json',
                data: {
                    id: id
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data) {
                    all()
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Đổi trạng thái', 'Đổi trạng thái thành công!'); $scope.clear;
                }
                else {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Đổi trạng thái', 'Đổi trạng thái thất bại!'); $scope.clear;
                }
            })
    }
    $scope.ApplyAdd = function (file) {
        file.upload = Upload.upload({
            url: '/AccountAdmin/ChangeImage',
            data: { image: file },
        }).then(function (response) {
            if (response.data) {
                user();
                $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                $notify.setPosition('bottom-left');
                $notify.success('Đổi hình đại diện', 'Đổi hình đại diện thành công!'); $scope.clear;
            }
            else {
                $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                $notify.setPosition('bottom-left');
                $notify.error('Đổi hình đại diện', 'Đổi hình đại diện thất bại!');
            }
        })
    }
    $scope.Clear = function () {
        Clea();
    }
    function Clea() {
        $scope.NewImg = "";
        $scope.FirstName = "";
        $scope.LastName = "";
        $scope.Addess = "";
        $scope.Phone = "";

    }
    $scope.ChangeName = function () {
        $http(
            {
                method: "POST",
                url: "/AccountAdmin/ChangeName",
                dataType: 'json',
                data: {
                    firstName: $scope.FirstName,
                    lastName: $scope.LastName
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data) {
                    user($scope.IdAcc);
                    Clea();
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Đổi tên', 'Đổi tên thành công!'); $scope.clear;
                }
                else {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.error('Đổi tên', 'Đổi tên thất bại!');
                }
            })
    }
    $scope.ChangePhone = function () {
        $http(
            {
                method: "POST",
                url: "/AccountAdmin/ChangePhone",
                dataType: 'json',
                data: {
                    phone: $scope.Phone
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data) {
                    user($scope.IdAcc);
                    Clea();
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Đổi số điện thoại', 'Đổi số điện thoại thành công!'); $scope.clear;
                }
                else {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.error('Đổi số điện thoại', 'Đổi số điện thoại thất bại!');
                }
            })
    }
    $scope.ChangeAddess = function () {
        $http(
            {
                method: "POST",
                url: "/AccountAdmin/ChangeAddess",
                dataType: 'json',
                data: {
                    addess: $scope.Addess
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data) {
                    user($scope.IdAcc);
                    Clea();
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Đổi địa chỉ', 'Đổi địa chỉ thành công!'); $scope.clear;
                }
                else {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.error('Đổi địa chỉ thoại', 'Đổi địa chỉ thất bại!');
                }
            })
    }
    $http(
        {
            method: "POST",
            url: "/GroupUser/checkAuthorities",
            dataType: 'json',
            data: { Authorities: "23" }
        }).then(function (response) {
            if (response.data) {
                $scope.CheckAutAdd = false;
            }
            else {
                $scope.CheckAutAdd = true;
            }
        })
    $http(
        {
            method: "POST",
            url: "/GroupUser/checkAuthorities",
            dataType: 'json',
            data: { Authorities: "24" }
        }).then(function (response) {
            if (response.data) {
                $scope.CheckAutViewList = false;
            }
            else {
                $scope.CheckAutViewList = true;
            }
        })
    $http(
        {
            method: "POST",
            url: "/GroupUser/checkAuthorities",
            dataType: 'json',
            data: { Authorities: "1031" }
        }).then(function (response) {
            if (response.data) {
                $scope.CheckAutEditType = false;
            }
            else {
                $scope.CheckAutEditType = true;
            }
        })
    $http(
        {
            method: "POST",
            url: "/GroupUser/checkAuthorities",
            dataType: 'json',
            data: { Authorities: "25" }
        }).then(function (response) {
            if (response.data) {
                $scope.CheckAutActive = false;
            }
            else {
                $scope.CheckAutActive = true;
            }
        })

    $scope.User = function () {
        $scope.SearchHide = true;
        $scope.userHide = false;
        $scope.AllHide = true;
        $scope.AddHide = true;
        user();
    }
    $scope.AddAcc = function () {
        $scope.AddHide = false;
        $scope.SearchHide = true;
        $scope.userHide = true;
        $scope.AllHide = true;
    }
    AllGroupUser();
    function AllGroupUser() {
        $http(
            {
                method: "GET",
                url: "/GroupUser/AllGroup",
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                $scope.dataGroupUser = response.data;
            })
    }
    $scope.OldPassHide = false;
    $scope.CheckPass = function () {
        if ($scope.OldPass.length > 5) {
            $http(
                {
                    method: "POST",
                    url: "/AccountAdmin/CheckPass",
                    dataType: 'json',
                    data: {
                        pass: $scope.OldPass
                    },
                    headers: { "Content-Type": "application/json" }
                }).then(function (response) {
                    if (response.data) {
                        $scope.OldPassHide = true;
                    }
                })
        }

    }
    $scope.ChangePassword = function (passNew) {
        $http(
            {
                method: "POST",
                url: "/AccountAdmin/ChangePass",
                dataType: 'json',
                data: {
                    pass: passNew
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data) {
                    $window.location.href = '/AccountAdmin/Account';
                }
                else {
                    $scope.OldPass = null;
                    $scope.NewPass = null;
                    $scope.ConfirmPass = null;
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.error('Đổi mật khẩu', 'Đổi mật khẩu thất bại!');
                }
            })
    }
    function all() {
        $http(
            {
                method: "GET",
                url: "/AccountAdmin/AllAccount",
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                $scope.dataAllUser = response.data;
            })
    }
    $scope.AllAcc = function () {
        $scope.SearchHide = false;
        $scope.AddHide = true;
        $scope.userHide = true;
        $scope.AllHide = false;
        all();
    }
    $scope.checkTypeAcc = false;
    $scope.CheckType = function (type) {
        if (type == '') {
            $scope.checkTypeAcc = false;
        }
        else {
            $scope.checkTypeAcc = true;
        }
    }
    $scope.CheckEmail = function (email) {
        if ($scope.frmAddAcc.Email.$valid) {
            $http(
                {
                    method: "POST",
                    url: "/AccountAdmin/CheckEmail",
                    dataType: 'json',
                    data: {
                        email: email
                    },
                    headers: { "Content-Type": "application/json" }
                }).then(function (response) {
                    if (response.data) {
                        $scope.emailNew = true;
                    }
                    else {
                        $scope.emailNew = false;
                    }
                })
        }
    }
    $scope.AddNewAcc = function (NewAcc) {
        $http(
            {
                method: "POST",
                url: "/AccountAdmin/NewAcc",
                dataType: 'json',
                data: {
                    user: NewAcc
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data) {
                    $scope.newAcc = '';
                    all();
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Tạo tài khoản', 'Tạo tài khoản  thành công!');
                }
                else {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.error('Tạo tài khoản', 'Tạo tài khoản ' + NewAcc.Name + ' thất bại!');
                }
            })
    }
});
myCntr.controller("GroupUserAdmin", function ($scope, $http, Upload, $notify) {
    $http(
        {
            method: "POST",
            url: "/GroupUser/checkAuthorities",
            dataType: 'json',
            data: { Authorities: "27" }
        }).then(function (response) {
            if (response.data) {
                $scope.CheckAutEdit = false;
            }
            else {
                $scope.CheckAutEdit = true;
            }
        })
    $http(
        {
            method: "POST",
            url: "/GroupUser/checkAuthorities",
            dataType: 'json',
            data: { Authorities: "28" }
        }).then(function (response) {
            if (response.data) {
                $scope.CheckAutDelete = false;
            }
            else {
                $scope.CheckAutDelete = true;
            }
        })
    $http(
        {
            method: "POST",
            url: "/GroupUser/checkAuthorities",
            dataType: 'json',
            data: { Authorities: "29" }
        }).then(function (response) {
            if (response.data) {
                $scope.CheckAutActive = false;
            }
            else {
                $scope.CheckAutActive = true;
            }
        })
    $http(
        {
            method: "POST",
            url: "/GroupUser/checkAuthorities",
            dataType: 'json',
            data: { Authorities: "41" }
        }).then(function (response) {
            if (response.data) {
                $scope.CheckAutAdd = false;
            }
            else {
                $scope.CheckAutAdd = true;
            }
        })
    $scope.pageSize = 3;
    $scope.selectedPage = 1;
    account();
    AllGroup();
    $scope.selectPage = function (page) {
        $scope.selectedPage = page;
    }
    $scope.toPage = function (page) {
        $scope.selectedPage = page;
    }
    $scope.goToPrev = function () {
        if ($scope.selectedPage > 1)
            $scope.selectedPage--;
    }
    $scope.goToNext = function (page) {
        if ($scope.data != null) {
            if ($scope.selectedPage < $scope.data.length)
                $scope.selectedPage++;
        }

    }
    $scope.PagePrevActive = function () {
        return $scope.selectedPage == 1 ? 'ng-hide' : 'ng-show';
    }
    $scope.PageNextActive = function (page) {
        if ($scope.data != null) {
            return $scope.selectedPage == $scope.data.length ? 'ng-hide' : 'ng-show';
        }
        return 'ng-hide';
    }
    $scope.PageActive = function (page) {
        if ($scope.data.length == 1) {
            return $scope.selectedPage == page ? 'ng-hide' : '';
        }
        else {

            return $scope.selectedPage == page ? 'btn-danger' : '';
        }
    }
    function account() {
        $http(
            {
                method: "GET",
                url: "/AccountAdmin/AllAccount"
            }).then(function (response) {
                $scope.accountAll = response.data;
            })
    }
    function AllGroup() {
        $http(
            {
                method: "Get",
                url: "/GroupUser/AllGroup1"
            }).then(function (response) {
                if (response.data == "") {
                    $scope.dataAll = "";
                }
                else {
                    $scope.dataAll = response.data;
                }
            })
    }
    $scope.ChangeType = function (id) {
        $http(
            {
                method: "POST",
                url: "/GroupUser/ChangeType",
                dataType: 'json',
                data: {
                    Id: id
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data) {
                    AllGroup();
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Sửa trạng thái', 'Sửa trạng thái thành công!');
                }
                else {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.error('Sửa trạng thái', 'Sửa trạng thái thất bại!');
                }
            })
    }
    $scope.ChangeName = function (name, id) {
        $http(
            {
                method: "POST",
                url: "/GroupUser/ChangeName",
                dataType: 'json',
                data: {
                    Id: id,
                    name: name
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data) {
                    AllGroup();
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Sửa tên', 'Sửa tên thành công!');
                }
                else {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.error('Sửa tên', 'Sửa tên thất bại!');
                }
            })
    }
    function Clear() {
        $scope.AddHide = true;
        $scope.DeleteHide = true;
        $scope.dataDel = '';
        $scope.EditHide = true;
        $scope.List = {
            dataAuthorities: []
        };
    }
    Clear();
    $scope.Clear = function () {
        Clear();
    }
    $scope.AddAcc = function () {
        $scope.AddHide = false;
    }

    $scope.delete = function (id) {
        Clear();
        $http(
            {
                method: "POST",
                url: "/GroupUser/GroupByID",
                dataType: 'json',
                data: {
                    Id: id
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                $scope.dataDel = response.data;
            })
        $scope.DeleteHide = false;
    }
    $scope.AddAcc = function () {
        Clear();
        $scope.AddHide = false;
    }
    $scope.RemoveType = function (id) {
        $http(
            {
                method: "POST",
                url: "/GroupUser/Delete",
                dataType: 'json',
                data: {
                    Id: id
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data) {
                    AllGroup();
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Xóa loại', 'Xóa loại thành công!');
                }
                else {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.error('Xóa loại', 'Xóa loại thất bại!');
                }
            })
    }
    $http(
        {
            method: "GET",
            url: "/GroupUser/ListAuthorities"
        }).then(function (response) {
            $scope.dataAuthorities = response.data;
        })
    $scope.List = {
        dataAuthorities: []
    };
    $scope.NewType = function (name, list) {
        $http(
            {
                method: "POST",
                url: "/GroupUser/NewType",
                dataType: 'json',
                data: {
                    name: name,
                    list: list
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data) {
                    AllGroup();
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Thêm loại', 'Thêm loại thành công!');
                }
                else {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.error('Thêm loại', 'Thêm loại thất bại!');
                }
            })
    }
    $scope.Edit = function (id) {
        Clear();
        $http(
            {
                method: "POST",
                url: "/GroupUser/GroupByID",
                dataType: 'json',
                data: {
                    Id: id
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                $scope.dataEdit1 = response.data;
            })
        $scope.EditHide = false;
        $http(
            {
                method: "POST",
                url: "/GroupUser/CheckAuthorities",
                dataType: 'json',
                data: {
                    id: id
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data != "") {
                    var authorities = response.data;
                    $scope.List = {
                        dataAuthorities: authorities
                    };

                }
            })
    }

    $scope.EditType = function (id, name, authorities) {
        $http(
            {
                method: "POST",
                url: "/GroupUser/EditType",
                dataType: 'json',
                data: {
                    id: id,
                    name: name,
                    authorities: authorities
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data) {
                    AllGroup();
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Sửa loại tài khoản', 'Sửa loại tài khoản thành công!');
                    Clear();
                }
                else {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.error('Sửa loại tài khoản', 'Sửa loại tài khoản thất bại!');
                }
            })
    }

}
);
myCntr.controller("LogInAdmin", function ($scope, $http, Upload, $notify, $window) {
    $scope.frmLogin = false;
    $scope.frmForgetPassW = true;
    $scope.frmResetPassW = true;

    $scope.ToForgetPassW = function () {
        $scope.frmLogin = true;
        $scope.frmForgetPassW = false;
        $scope.inputCode = true;
        $scope.inputCode = true;
        $scope.SendCode1 = false;
        $scope.frmResetPassW = true;

    }
    $scope.ToLogin = function () {
        $scope.frmLogin = false;
        $scope.frmForgetPassW = true;
        $scope.frmResetPassW = true;

    }
    $scope.ToInputCode = function () {
        $scope.frmLogin = true;
        $scope.frmForgetPassW = false;
        $scope.inputCode = false;
        $scope.SendCode1 = true;
        $scope.frmResetPassW = true;
    }
    $scope.ToSendCode = function () {
        $scope.frmLogin = true;
        $scope.frmForgetPassW = false;
        $scope.inputCode = true;
        $scope.SendCode1 = false;
        $scope.frmResetPassW = true;

    }
    $scope.SendCode = function (email) {
        $http(
            {
                method: "POST",
                url: "/AccountAdmin/SendCodeResetPass",
                dataType: 'json',
                data: { email: email },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data == true) {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Gửi mã xác nhận', 'Gửi mã xác nhận thành công!');
                    $scope.frmLogin = true;
                    $scope.frmForgetPassW = false;
                    $scope.inputCode = false;
                    $scope.SendCode1 = true;
                    $scope.frmResetPassW = true;
                    $scope.EmailSend = '';

                }
                else {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.error('Gửi mã xác nhận', response.data);
                    $scope.EmailSend = '';
                }
            })
    }
    $scope.CheckCode = function (email, code) {
        $http(
            {
                method: "POST",
                url: "/AccountAdmin/checkCode",
                dataType: 'json',
                data: {
                    email: email,
                    code: code
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data == 2) {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Xác nhận', 'Xác nhận thành công!');
                    $scope.frmLogin = true;
                    $scope.frmForgetPassW = true;
                    $scope.inputCode = true;
                    $scope.SendCode1 = true;
                    $scope.frmResetPassW = false;
                    $scope.CodeReset = '';
                }
                if (response.data == 1) {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.warning('Xác nhận', 'Email sai!');
                    $scope.EmailReset = '';
                    $scope.CodeReset = '';

                }
                if (response.data == 3) {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.error('Xác nhận', 'Xác nhận thất bại!');
                    $scope.CodeReset = '';
                    $scope.EmailReset = '';
                }
            })
    }
    $scope.ResetPasssWord = function (email, pass) {
        $http(
            {
                method: "POST",
                url: "/AccountAdmin/ResetPass",
                dataType: 'json',
                data: {
                    email: email,
                    pass: pass
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data) {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Đổi mật khẩu', 'Đổi mật khẩu thành công!');
                    $scope.frmLogin = false;
                    $scope.frmForgetPassW = true;
                    $scope.frmResetPassW = true;
                    $scope.EmailSend = '';
                    $scope.CodeReset = '';
                    $scope.PassWordNew = '';
                    $scope.PassWordNew2 = '';

                }
                else {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.error('Đổi mật khẩu', 'Đổi mật khẩu thất bại!');

                }

            })
    }
    //code login
    $scope.LogIn = function (email, password) {
        $http(
            {
                method: "POST",
                url: "/AccountAdmin/LogInAdmin",
                dataType: 'json',
                data: {
                    email: email,
                    pass: password
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data == 1) {
                    $window.location.href = '/AccountAdmin/Account';
                }
                else {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.error('Đăng nhập', response.data);
                }
            })
    }
});
myCntr.controller("AccountDetail", function ($scope, $http, Upload, $notify, $window) {
    $http(
        {
            method: "POST",
            url: "/GroupUser/checkAuthorities",
            dataType: 'json',
            data: { Authorities: "24" }
        }).then(function (response) {
            if (response.data) {
                $scope.CheckAutViewDetailAcc = false;
            }
            else {
                $window.location.href = '/Page/404/index.html';
            }
        })
    $http(
        {
            method: "POST",
            url: "/GroupUser/checkAuthorities",
            dataType: 'json',
            data: { Authorities: "12" }
        }).then(function (response) {
            if (response.data) {
                $scope.CheckAutViewCmt = false;
            }
            else {
                $scope.CheckAutViewCmt = true;
            }
        })
    $http(
        {
            method: "POST",
            url: "/GroupUser/checkAuthorities",
            dataType: 'json',
            data: { Authorities: "12" }
        }).then(function (response) {
            if (response.data) {
                $scope.CheckAutDelCmt = false;
            }
            else {
                $scope.CheckAutDelCmt = true;
            }
        })
    $http(
        {
            method: "POST",
            url: "/GroupUser/checkAuthorities",
            dataType: 'json',
            data: { Authorities: "25" }
        }).then(function (response) {
            if (response.data) {
                $scope.CheckAutActive = false;
            }
            else {
                $scope.CheckAutActive = true;
            }
        })
    $scope.CheckDetail = function (id) {
        user(id);
    }
    function user(id) {
        $http(
            {
                method: "POST",
                url: "/AccountAdmin/AccById1",
                dataType: 'json',
                data: { id: id },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data == false) {
                    $scope.dataUser = '';
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.warning('Xem chi tiết', 'Đã có lỗi, không tìm được thông tin!');
                }
                else {
                    $scope.dataUser = response.data;
                }
            })
    }
    $scope.ChangeActive = function (id) {
        $http(
            {
                method: "POST",
                url: "/AccountAdmin/ChangeActive",
                dataType: 'json',
                data: { id: id },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data == false) {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.warning('Đổi tình trạng', 'Đổi tình trạng thất bại!');
                }
                else {
                    user(id);
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Đổi tình trạng', 'Đổi tình trạng thành công!');
                }
            })
    }
    AllGroupUser();
    function AllGroupUser() {
        $http(
            {
                method: "GET",
                url: "/GroupUser/AllGroup",
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                $scope.dataGroupUser = response.data;
            })
    }
    $scope.changeTypeUser = function (id, type) {
        if (type != "") {
            $http(
                {
                    method: "POST",
                    url: "/AccountAdmin/ChangeTypeAcc",
                    dataType: 'json',
                    data: {
                        id: id,
                        type: type
                    },
                    headers: { "Content-Type": "application/json" }
                }).then(function (response) {
                    if (response.data) {
                        user(id);
                        $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                        $notify.setPosition('bottom-left');
                        $notify.success('Đổi loại tài khoản', 'Đổi loại tài khoản thành công!');
                    }
                    else {
                        $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                        $notify.setPosition('bottom-left');
                        $notify.error('Đổi loại tài khoản', 'Đổi loại tài khoản thất bại!');
                    }
                })
        }
    }
    $scope.pageSize = 4;
    $scope.selectedPage = 1;
    $scope.selectPage = function (page) {
        $scope.selectedPage = page;
    }
    $scope.toPage = function (page) {
        $scope.selectedPage = page;
    }
    $scope.goToPrev = function () {
        if ($scope.selectedPage > 1)
            $scope.selectedPage--;
    }
    $scope.goToNext = function (page) {
        if ($scope.data != null) {
            if ($scope.selectedPage < $scope.data.length)
                $scope.selectedPage++;
        }
    }
    $scope.PagePrevActive = function () {
        return $scope.selectedPage == 1 ? 'ng-hide' : 'ng-show';
    }
    $scope.PageNextActive = function (page) {
        if ($scope.data != null) {
            return $scope.selectedPage == $scope.data.length ? 'ng-hide' : 'ng-show';
        }
        return 'ng-hide';
    }
    $scope.PageActive = function (page) {
        if ($scope.data.length == 1) {
            return $scope.selectedPage == page ? 'ng-hide' : '';
        }
        else {
            return $scope.selectedPage == page ? 'btn-danger' : '';
        }
    }
    //phân  trang bình luận
    $scope.pageSize1 = 6;
    $scope.selectedPage1 = 1;
    $scope.selectPage1 = function (page) {
        $scope.selectedPage1 = page;
    }
    $scope.toPage1 = function (page) {
        $scope.selectedPage1 = page;
    }
    $scope.goToPrev1 = function () {
        if ($scope.selectedPage1 > 1)
            $scope.selectedPage1--;
    }
    $scope.goToNext1 = function (page) {
        if ($scope.data1 != null) {
            if ($scope.selectedPage1 < $scope.data1.length)
                $scope.selectedPage1++;
        }
    }
    $scope.PagePrevActive1 = function () {
        return $scope.selectedPage1 == 1 ? 'ng-hide' : 'ng-show';
    }
    $scope.PageNextActive1 = function (page) {
        if ($scope.data1 != null) {
            return $scope.selectedPage1 == $scope.data1.length ? 'ng-hide' : 'ng-show';
        }
        return 'ng-hide';
    }
    $scope.PageActive1 = function (page) {
        if ($scope.data1.length == 1) {
            return $scope.selectedPage1 == page ? 'ng-hide' : '';
        }
        else {
            return $scope.selectedPage1 == page ? 'btn-danger' : '';
        }
    }
    GetAllStatus();
    function GetAllStatus() {
        $http(
            {
                method: "Get",
                url: "/OrderAdmin/AllStatust"
            }).then(function (response) {

                $scope.message = "";
                $scope.dataStatus = response.data;
            }
            )
    }
    $scope.HideViewOrder = true;
    $scope.HideViewCmt = true;
    $scope.ViewCmt = function (id) {
        $scope.HideViewOrder = true;
        $scope.HideViewCmt = false;
        viewComment();
    }
    function viewComment() {
        $http(
            {
                method: "Get",
                url: "/CommentAdmin/All",
            }).then(function (res) {
                $scope.dataCmt = res.data;
            }
            )
    }
    $scope.ViewOrder = function (id) {
        $scope.HideViewOrder = false;
        $scope.HideViewCmt = true;

        $http(
            {
                method: "POST",
                url: "/OrderAdmin/BillByCreator",
                dataType: 'json',
                data: {
                    _id: id
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data != '') {
                    $scope.dataBill = response.data;
                }
                else {
                    $scope.dataBill = '';
                }
            })
    }
    allProd();
    function allProd() {
        $http(
            {
                method: "Get",
                url: "/ProductAdmin/ListProduct"
            }).then(function (response) {
                $scope.dataProd = response.data;
            })
    }
    $scope.RemoveCmt = function (id) {
        $http(
            {
                method: "POST",
                url: "/CommentAdmin/Delete",
                dataType: 'json',
                data: {
                    id: id
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data != false) {
                    viewComment();
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Xóa bình luận', 'Xóa bình luận thành công!');

                }
                else {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.errr('Xóa bình luận', 'Xóa bình luận thất bại!');
                }
            })
    }
});