/// <reference path="../scripts/angular.min.js" />
//các trang admin
myCntr.controller("OrderAdmin", function ($scope, $http) {
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
    $scope.dataOrderNew = null;
    $scope.quantityNewOrder = 0;
    //đếm tổng order
    $http(
        {
            method: "Get",
            url: "/OrderAdmin/QuantityNewCart"
        }).then(function (response) {
            if (response.data == "") {
                $scope.quantityNewOrder = 0;
            }
            else {
                $scope.quantityNewOrder = response.data;
            }
        }
        )
    $http(
        {
            method: "Get",
            url: "/OrderAdmin/QuantityAllOrder"
        }).then(function (response) {
            if (response.data == "") {
                $scope.CartInMonth = 0;
            }
            else {
                $scope.CartInMonth = response.data;
            }
        }
        )
    //lấy các hóa đơn mới
    $scope.ViewOrderNew = function () {
        $http(
            {
                method: "Get",
                url: "/OrderAdmin/GetNewCart"
            }).then(function (response) {
                if (response.data == "") {
                    $scope.message = "Không tìm thấy kết quả nào!";
                }
                else {
                    $scope.message = "";
                    $scope.dataOrderNew = response.data;
                }
            }
            )
    }
});
//danh sách các sản phẩm *
myCntr.controller("ProductAdmin", function ($scope, $http, Upload, $notify, $window) {
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
            data: { Authorities: "21" }
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
            data: { Authorities: "20" }
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
            data: { Authorities: "19" }
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
            data: { Authorities: "22" }
        }).then(function (response) {
            if (response.data) {
                $scope.CheckAutAdd = false;
            }
            else {
                $scope.CheckAutAdd = true;
            }
        })
    $scope.options = {
        language: 'en',
        allowedContent: true,
        entities: false
    };
    $scope.onReady = function () {
        // ... 
    };
    $scope.ChangeActive = function (id) {
        $http(
            {
                method: "POST",
                url: "/ProductAdmin/ChangeActive",
                dataType: 'json',
                data: { id: id },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data) {
                    GetAllProduc();
                    EditProduct(id);
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Đổi thuộc tính', 'Đổi thuộc tính thành công!');
                }
                else {
                    $scope.dataProductNew = response.data;
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.error('Đổi thuộc tính', 'Đổi thuộc tính thất bại!');
                }
            }
            )
    }
    $scope.AddProduct1 = function (product, img) {
        $scope.AddHide = false;
        $scope.AppyInProduct = true;
        $scope.DetailHide = true;
        $scope.DeleteHide = true;
        $scope.EditHide = true;

        img.upload = Upload.upload({
            url: "/ProductAdmin/AddProduct",
            data: { product, Image: img },
        }).then(function (response) {
            if (response.data) {
                GetAllProduc();
                $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                $notify.setPosition('bottom-left');
                $notify.success('Thêm sản phẩm', 'Thêm sản phẩm thành công!');
                $scope.DataNew = "";
                $scope.NewImg = "";
            }
            else {
                $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                $notify.setPosition('bottom-left');
                $notify.error('Thêm sản phẩm', 'Thêm sản phẩm thất bại!');
            }
        })
    }
    $scope.EditProduct1 = function (product, img) {
        $scope.AddHide = true;
        $scope.AppyInProduct = true;
        $scope.DetailHide = true;
        $scope.DeleteHide = true;
        $scope.EditHide = false;
        if (img == null) {
            img = '';
        }
        img.upload = Upload.upload({
            url: "/ProductAdmin/Edit",
            data: { product, fileImage: img },
        }).then(function (response) {
            if (response.data) {
                GetAllProduc();
                $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                $notify.setPosition('bottom-left');
                $notify.success('Sửa sản phẩm', 'Sửa sản phẩm thành công!');
                $scope.DataNew = "";
                $scope.NewImg = "";
            }
            else {
                $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                $notify.setPosition('bottom-left');
                $notify.error('Sửa sản phẩm', 'Sửa sản phẩm thất bại!');
            }
        })
    }
    $scope.pageSize = 5;
    GetAllProduc();
    clear();
    $scope.selectedPage = 1;
    function clear() {
        $scope.DetailHide = true;
        $scope.DeleteHide = true;
        $scope.AppyInProduct = false;
        $scope.ProductDetail = null;
        $scope.EditHide = true;
        $scope.AddHide = true;
    }
    $scope.Clear = function () {
        clear();
    }
    function GetAllProduc() {
        $http(
            {
                method: "Get",
                url: "/ProductAdmin/ListProduct"
            }).then(function (response) {
                if (response.data == "") {
                    $scope.dataProductNew = "";
                }
                else {
                    $scope.message = "";
                    $scope.dataProductNew = response.data;
                }
            }
            )
    }
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
    //xóa sản phẩm
    $scope.DeleteProductAd = function (id) {

        $http(
            {
                method: "POST",
                url: "/ProductAdmin/ListProductById",
                dataType: 'json',
                data: { id: id },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data == "") {
                    $scope.ProductDetail = null;
                }
                else {
                    $scope.ProductDetail = response.data;
                    $scope.DeleteHide = false;
                    $scope.AppyInProduct = false;
                    $scope.DetailHide = true;
                    $scope.EditHide = true;
                    $scope.AddHide = true;
                }
            }
            )
    }
    $scope.ApplyDelete = function (id) {
        $http(
            {
                method: "POST",
                url: "/ProductAdmin/DleteProduct",
                dataType: 'json',
                data: { id: id },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data == "") {
                    $scope.dataComment = null;
                    $scope.message = "Không tìm thấy kết quả nào!";
                }
                else {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Xóa sản phẩm', 'Đã xóa sản phẩm thành công!');
                    GetAllProduc();
                }
            }
            )
    }
    //Them san pham moi
    $scope.AddProduct = function () {
        allCategory();
        $scope.AddHide = false;
        $scope.AppyInProduct = true;
        $scope.DetailHide = true;
        $scope.DeleteHide = true;
        $scope.EditHide = true;
    }
    function EditProduct(id){
        $http(
            {
                method: "POST",
                url: "/ProductAdmin/ListProductById",
                dataType: 'json',
                data: { id: id },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data == "") {
                    $scope.ProductDetail = null;
                }
                else {
                    $scope.ProductDetail = response.data;
                    
                }
            }
            )
    }
    //sửa sản phẩm
    $scope.EditProductAd = function (id) {
        $scope.AppyInProduct = true;
        $scope.DetailHide = true;
        $scope.AddHide = true;
        $scope.EditHide = false;
        EditProduct(id);
        allCategory();
    }
    //lấy thong tin Category
    function allCategory() {
        $http(
            {
                method: "Get",
                url: "/CategoryAdmin/CategoryAll"
            }).then(function (response) {
                if (response.data == "") {
                    $scope.Category = null;
                }
                else {
                    $scope.Category = response.data;
                }
            }
            )
    }

    //thông tin sản phẩm
    $scope.DetailProductAd = function (id) {
        $scope.EditHide = true;
        $scope.AppyInProduct = true;
        $scope.DetailHide = false;
        $scope.AddHide = true;
        $http(
            {
                method: "POST",
                url: "/ProductAdmin/ListProductById",
                dataType: 'json',
                data: { id: id },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data == "") {
                    $scope.Hide = "hide";
                    $scope.ProductDetail = null;
                    $scope.message = "Không tìm thấy kết quả nào!";
                }
                else {
                    $scope.ProductDetail1 = response.data;

                    $http(
                        {
                            method: "POST",
                            url: "/AccountAdmin/NameAccountById",
                            dataType: 'json',
                            data: { id: $scope.ProductDetail1.Creator },
                            headers: { "Content-Type": "application/json" }
                        }).then(function (response) {
                            if (response.data == "") {
                                $scope.creator = "";
                            }
                            else {
                                $scope.creator = response.data;
                            }
                        }
                        )
                    $http(
                        {
                            method: "POST",
                            url: "/CategoryAdmin/NameCategoryById",
                            dataType: 'json',
                            data: { id: $scope.ProductDetail1.Category },
                            headers: { "Content-Type": "application/json" }
                        }).then(function (response) {
                            if (response.data == "") {
                                $scope.nameCategory = "";
                            }
                            else {
                                $scope.nameCategory = response.data;
                            }
                        }
                        )
                }
            }
            )
    }

})
myCntr.controller("MenuController", function ($scope, $http, $notify, $window) {
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
    $scope.ViewAccount = function (id) {
        $window.open('/AccountAdmin/AccountDetail/' + id);
    }
    $http(
        {
            method: "POST",
            url: "/GroupUser/checkAuthorities",
            dataType: 'json',
            data: { Authorities: "6" }
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
            data: { Authorities: "7" }
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
            data: { Authorities: "8" }
        }).then(function (response) {
            if (response.data) {
                $scope.CheckAutAdd = false;
            }
            else {
                $scope.CheckAutAdd = true;
            }
        })
    $scope.pageSize = 5;
    $scope.selectedPage = 1;
    GetAllMenu();
    account();
    function GetAllMenu() {
        $http(
            {
                method: "Get",
                url: "/MenuAdmin/ListMenu"
            }).then(function (response) {
                if (response.data == "") {
                    $scope.dataMenu = "";
                }
                else {
                    $scope.message = "";
                    $scope.dataMenu = response.data;
                }
            }
            )
    }
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
    $scope.DeleteMenuAd = function (id) {
        $http(
            {
                method: "POST",
                url: "/MenuAdmin/DeleteMenu",
                dataType: 'json',
                data: { idMenu: id },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                GetAllMenu();
                $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                $notify.setPosition('bottom-left');
                $notify.success('Xóa menu', 'Đã xóa menu ' + response.data + ' thành công!');
            })
    }
    $scope.error = true;
    $scope.ModalDelete = function (id) {
        $http(
            {
                method: "POST",
                url: "/MenuAdmin/MenuById",
                dataType: 'json',
                data: { idMenu: id },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                $scope.DeleteHide = false;
                $scope.AddHide = true;
                $scope.EditHide = true;
                $scope.MenuDeleteData = response.data;

            })
    }

    $scope.test = function () { disable() };
    function disable() {
        if ($scope.OrderMenu.value < 8 && $scope.OrderMenu.value > 0 && $scope.MenuName != null && $scope.MenuURL != null) {
            if ($scope.MenuName.length >= 5 && $scope.MenuURL.length >= 5)
                $scope.error = false;
            else
                $scope.error = true;
        }
        else
            $scope.error = true;
    }
    $scope.OrderMenu = { value: 1 };
    $scope.AddMenu = function () {
        $scope.DeleteHide = true;
        $scope.AddHide = false;
        $scope.EditHide = true;
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
    function Cleal() {
        $scope.MenuName = "";
        $scope.MenuURL = "";
        $scope.OrderMenu.value = 1;
    }
    $scope.AddMenuAd = function () {
        var arrCm =
            {
                MenuName: $scope.MenuName,
                URLMenu: $scope.MenuURL,
                Order: $scope.OrderMenu.value
            };
        $http(
            {
                method: "POST",
                url: "/MenuAdmin/MenuAdd",
                dataType: 'json',
                data: arrCm,
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data) {
                    GetAllMenu();
                    Cleal();
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Thêm menu', 'Đã thêm menu thành công!');

                } else {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.error('Thêm menu', 'Đã thêm menu thất bại!');
                }

            })
    }
    //sửa
    $scope.EditMenu = function (id) {
        $http(
            {
                method: "POST",
                url: "/MenuAdmin/MenuById",
                dataType: 'json',
                data: { idMenu: id },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                $scope.DeleteHide = true;
                $scope.AddHide = true;
                $scope.EditHide = false;
                $scope.MenuEditData = response.data;

            })
    }
    //$scope.MenuEditData.OrderMenu = 1;
    $scope.errorEdit = true;
    $scope.testEdit = function () {
        if ($scope.MenuEditData.Order < 8 && $scope.MenuEditData.Order > 0 && $scope.MenuEditData.MenuName != null && $scope.MenuEditData.URLMenu != null) {
            if ($scope.MenuEditData.MenuName.length >= 5 && $scope.MenuEditData.URLMenu.length >= 5)
                $scope.errorEdit = false;
            else
                $scope.errorEdit = true;
        }
        else
            $scope.errorEdit = true;
    };
    $scope.EditMenuAd = function (id) {
        $scope.MenuEditData.ID = id;
        $http(
            {
                method: "POST",
                url: "/MenuAdmin/MenuEdit",
                dataType: 'json',
                data: $scope.MenuEditData,
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data) {
                    GetAllMenu();
                    Cleal();
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Sửa menu', 'Đã sửa menu thành công!');

                } else {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.error('Thêm sửa', 'Đã sửa menu thất bại!');
                }

            })
    }
});
//order 
myCntr.controller("OrderAdminController", function ($scope, $http, $notify, $window) {
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
            data: { Authorities: "4" }
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
            data: { Authorities: "3" },
            headers: { "Content-Type": "application/json" }
        }).then(function (response) {
            if (response.data) {
                $scope.CheckAutEdit = false;
            }
            else {
                $scope.CheckAutEdit = true;
            }
        })
    $scope.pageSize = 10;
    $scope.selectedPage = 1;
    GetAllOrder();
    account();
    GetAllStatus();
    function account() {
        $http(
            {
                method: "GET",
                url: "/AccountAdmin/AllAccount"
            }).then(function (response) {
                $scope.accountAll = response.data;
            })
    }
    function GetAllOrder() {
        $http(
            {
                method: "Get",
                url: "/OrderAdmin/AllOrder"
            }).then(function (response) {
                if (response.data == "") {
                    $scope.dataOrder = "";
                }
                else {
                    $scope.message = "";
                    $scope.dataOrder = response.data;
                }
            }
            )
    }
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
    $http(
        {
            method: "GET",
            url: "/ProductAdmin/ListProduct"
        }).then(function (response3) {
            $scope.dataProduct1 = response3.data;
        })
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
    $scope.OrderDetail = function (id) {
        $scope.DetailHide = false;
        $scope.DeleteHide = true;
        //update lượt xem
        $http(
            {
                method: "POST",
                url: "/OrderAdmin/UpdateView",
                dataType: 'json',
                data: { id: id },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                GetAllOrder();
            })
        $http(
            {
                method: "POST",
                url: "/OrderAdmin/OrderDetail",
                dataType: 'json',
                data: { id: id },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                $scope.dataOrderDetail = response.data;
                $http(
                    {
                        method: "POST",
                        url: "/OrderAdmin/BillDetailByIdBill",
                        dataType: 'json',
                        data: { id: $scope.dataOrderDetail.ID },
                        headers: { "Content-Type": "application/json" }
                    }).then(function (response2) {
                        $scope.dataDetail = response2.data;
                    })

            })
    }

    //xoas
    $scope.ApplyDelete = function (id) {
        $http(
            {
                method: "POST",
                url: "/OrderAdmin/DeleteOrder",
                dataType: 'json',
                data: { id: id },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data) {
                    GetAllOrder();
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Xóa hóa đơn', 'Đã xóa hóa đơn thành công!');
                }

            })
    }
    $scope.ModalDelete = function (id) {
        $scope.DetailHide = true;
        $scope.DeleteHide = false;
        $http(
            {
                method: "POST",
                url: "/OrderAdmin/OrderDetail",
                dataType: 'json',
                data: { id: id },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                $scope.dataDetail2 = response.data;
            })
    }
    $scope.changeStatus = function (id) {

        $http(
            {
                method: "POST",
                url: "/OrderAdmin/UpdateStatust",
                dataType: 'json',
                data: {
                    id: id,
                    status: $scope.Status
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                GetAllOrder();
                $http(
                    {
                        method: "POST",
                        url: "/OrderAdmin/OrderDetail",
                        dataType: 'json',
                        data: { id: id },
                        headers: { "Content-Type": "application/json" }
                    }).then(function (response) {
                        $scope.dataOrderDetail = response.data;
                    })
                $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                $notify.setPosition('bottom-left');
                $notify.success('Sửa trạng thái hóa đơn', 'Đã sửa trạng thái hóa đơn thành công!');
            })

    }
});
//bill status
myCntr.controller("BillStatus", function ($scope, $http, $notify, $window) {
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
            data: { Authorities: "34" }
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
    GetAllStatus();
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
    //

    //
    function account() {
        $http(
            {
                method: "GET",
                url: "/AccountAdmin/AllAccount"
            }).then(function (response) {
                $scope.accountAll = response.data;
            })
    }
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
            }
            )
    }
    $scope.EditHide = true;
    $scope.DeleteHide = true;
    $scope.AddHide = false;
    $scope.TestStatus = true;
    $scope.TestEditStatus = true;
    $scope.testEdit = function () {
        if ($scope.StatusDeleteData.NameStatusBill != null && $scope.StatusDeleteData.InformationStatus != null) {
            if ($scope.StatusDeleteData.NameStatusBill.length > 5 && $scope.StatusDeleteData.InformationStatus.length > 5) {
                $scope.TestEditStatus = false;
            }
        }
    };
    $scope.test = function () {
        if ($scope.StatusName != null && $scope.StatusInf != null) {
            if ($scope.StatusName.length > 5 && $scope.StatusInf.length > 5) {
                $scope.TestStatus = false;
            }
        }
    };
    $scope.ModalAdd = function () {
        $scope.EditHide = true;
        $scope.DeleteHide = true;
        $scope.AddHide = false;
    }
    $scope.AddStatus = function () {

        $http(
            {
                method: "POST",
                url: "/StatusBill/AddStatus",
                dataType: 'json',
                data: {
                    name: $scope.StatusName,
                    information: $scope.StatusInf
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data) {
                    GetAllStatus();
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Thêm trạng thái', 'Thêm trạng thái thành công!');
                }
                else {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Thêm trạng thái', 'Thêm trạng thái thất bại!');
                }
            })
    }

    $scope.ModalDelete = function (id) {
        $scope.EditHide = true;
        $scope.DeleteHide = false;
        $scope.AddHide = true;
        StatutById(id);
    }
    function StatutById(id) {
        $http(
            {
                method: "POST",
                url: "/StatusBill/StatusById",
                dataType: 'json',
                data: {
                    _id: id
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                $scope.StatusDeleteData = response.data;
            })
    }
    $scope.RemoveStatus = function (id) {

        $http(
            {
                method: "POST",
                url: "/StatusBill/DeleteStatus",
                dataType: 'json',
                data: {
                    _id: id
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data) {
                    GetAllStatus();
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Xóa trạng thái', 'Xóa trạng thái thành công!');
                }
                else {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Xóa trạng thái', 'Xóa trạng thái thất bại!');
                }
            })
    }
    $scope.EditModal = function (id) {
        $scope.EditHide = false;
        $scope.DeleteHide = true;
        $scope.AddHide = true;
        StatutById(id);
    }

    $scope.EditStatus = function (id) {
        var data = $scope.StatusDeleteData;
        $http(
            {
                method: "POST",
                url: "/StatusBill/EditStatus",
                dataType: 'json',
                data: data,
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data) {
                    GetAllStatus();
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Sửa trạng thái', 'Sửa trạng thái thành công!');
                }
                else {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Sửa trạng thái', 'Sửa trạng thái thất bại!');
                }
            })
    }
});