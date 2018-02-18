﻿/// <reference path="../scripts/angular.min.js" />

var myCntr = angular.module("Controller", ['ngNotify']);

//sản phẩm hiển thị cho khách hàng
myCntr.controller("SliderCustomer2", function ($scope, $http) {
    $scope.Check = false;
    $scope.changeHide = function () {
        $scope.Check = true;
    }
    $scope.changeShow = function () {
        $scope.Check = false;
    }
});
myCntr.controller("LayoutCustomer", function ($scope, $http, $notify) {
    $http(
        {
            method: "get",
            url: "/Product/ProductNew",
        }).then(function (response) {
            $scope.dataProductNew = response.data;
        })
    $http(
        {
            method: "get",
            url: "/Product/TopHot",
        }).then(function (response) {
            $scope.dataProductHot = response.data;
        })
    $http(
        {
            method: "get",
            url: "/Product/ProductAll",
        }).then(function (response) {
            $scope.dataProductAll = response.data;
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
    $scope.PageActive = function (page) {
        if ($scope.data.length == 1) {
            return $scope.selectedPage == page ? 'ng-hide' : '';
        }
        else {

            return $scope.selectedPage == page ? 'btn-danger' : '';
        }
    }
    $scope.AddComment = function (prod,cmm) {
        $http(
            {
                method: "POST",
                url: "/Comment/AddComment",
                dataType: 'json',
                data: {
                    idProd: prod,
                    comment:cmm
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data) {
                    Comment(prod);
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Thêm bình luận ', 'Thêm bình luận thành công!');
                }
                else {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.error('Thêm bình luận ', 'Thêm bình luận thất bại!');
                }
            })
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
    $scope.Clear = function () {
        $scope.dataComment = null;
    }
    //commentByIdProduct
    function Comment(id) {
        $scope.dataComment = null;
        $http(
            {
                method: "POST",
                url: "/Comment/FindComment2",
                dataType: 'json',
                data: { id: id },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data == "") {
                    $scope.Hide = "hide";
                    $scope.dataComment = null;
                    $scope.message = "Không tìm thấy kết quả nào!";
                }
                else {
                    $scope.dataComment = response.data;
                }
            }
            )
    }
    $scope.Coment = function (idProd) {
        Comment(idProd);
    }
});
//Phần hóa đơn
myCntr.controller("OrderController", function ($scope, $http) {
    $scope.message = "Chưa có hóa đơn!";
    $scope.hide = "hide";
    $scope.dl = "hide";
    $scope.FindOrder2 = function () {
        $http(
            {
                method: "POST",
                url: "/Order/FindOrder2",
                dataType: 'json',
                data: { TradingCode: $scope.keyWord },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data == "") {
                    $scope.hide = "hide";
                    $scope.myData = null;
                    $scope.message = "Không tìm thấy kết quả nào!";
                }
                else {
                    $scope.hide = "show";
                    $scope.myData = response.data;

                    $http(
                        {
                            method: "POST",
                            url: "/Order/FindBillStatus",
                            dataType: 'json',
                            data: { id: $scope.myData.Status },
                            headers: { "Content-Type": "application/json" }
                        }).then(function (response_2) {
                            $scope.tatus = response_2.data;
                        })

                    $scope.message = "Hóa Đơn";

                    $scope.BillDetail = function () {
                        $http(
                            {
                                method: "POST",
                                url: "/Order/FindBillDetail",
                                dataType: 'json',
                                data: { id: $scope.myData.ID },
                                headers: { "Content-Type": "application/json" }
                            }).then(function (response_3) {
                                $scope.dl = "show";
                                $scope.dataBillDetail = response_3.data;
                                var arr = new Array();
                                var arr1 = $scope.dataBillDetail;

                                for (var i = 0; i < arr1.length; i++) {
                                    var arr2 = $scope.dataBillDetail[i];
                                    $http(
                                        {
                                            method: "POST",
                                            url: "/Order/ProductByBill",
                                            dataType: 'json',
                                            data: { id: arr2.IdProduct },
                                            headers: { "Content-Type": "application/json" }
                                        }).then(function (response_4) {
                                            arr.push(response_4.data.ProductName);
                                        })
                                }
                                $scope.Product = arr;
                            })
                    };
                }
            });
    }
    $scope.MessageCm = ""
    $scope.PostComment = function () {
        var arrCm =
            {
                Comment1: $scope.Content,
                Name: $scope.Name,
                Image: $scope.Image,
                Product: $scope.Product2
            };
        $http(
            {
                method: "POST",
                url: "/Comment/AddComment",
                dataType: 'json',
                data: arrCm,
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                $scope.MessageCm = response.data;
            })
    }

});

//hóa đơn trong account
myCntr.controller("OrderByAcc", function ($scope, $http) {
    $scope.Hide = "hide";
    $scope.Hide2 = "hide";
    $scope.ChangeOrder = function () {
        $http(
            {
                method: "POST",
                url: "/Order/FindOrder2",
                dataType: 'json',
                data: { TradingCode: $scope.orderInAcc },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data == "") {
                    $scope.Hide = "hide";
                    $scope.myData = null;
                    $scope.message = "Không tìm thấy kết quả nào!";
                }
                else {
                    $scope.Hide = "show";
                    $scope.myData = response.data;
                    $http(
                        {
                            method: "POST",
                            url: "/Order/FindBillStatus",
                            dataType: 'json',
                            data: { id: $scope.myData.Status },
                            headers: { "Content-Type": "application/json" }
                        }).then(function (response_2) {
                            $scope.tatus = response_2.data;
                        })
                    $http(
                        {
                            method: "POST",
                            url: "/Order/FindBillDetail",
                            dataType: 'json',
                            data: { id: $scope.myData.ID },
                            headers: { "Content-Type": "application/json" }
                        }).then(function (response_3) {
                            $scope.dl = "show";
                            $scope.dataBillDetail = response_3.data;
                            var arr = new Array();
                            var arr1 = $scope.dataBillDetail;

                            for (var i = 0; i < arr1.length; i++) {
                                var arr2 = $scope.dataBillDetail[i];
                                $http(
                                    {
                                        method: "POST",
                                        url: "/Order/ProductByBill",
                                        dataType: 'json',
                                        data: { id: arr2.IdProduct },
                                        headers: { "Content-Type": "application/json" }
                                    }).then(function (response_4) {
                                        $scope.Hide2 = "show";
                                        arr.push(response_4.data.ProductName);
                                    })
                            }
                            $scope.Product = arr;
                        })

                }
            }
            )
    }
}
);

//Phần giỏ hàng
myCntr.controller("Cart", function ($scope, $http, $notify, $window) {
    $scope.Message = "show";
    $scope.table = "hide";
    $scope.ViewCart = function () {
        $http(
            {
                method: "Get",
                url: "/Order/GetCart"
            }).then(function (response) {
                if (response.data === "") {
                    $scope.Hide = "hide";
                    $scope.Message = "show";
                    $scope.table = "hide";
                }
                else {
                    $scope.myData2 = response.data;
                    $scope.Message = "hide";
                    $scope.table = "show";
                    totalMoney();
                }
            })
    }
    $scope.Order2 = function () {
        $window.location.href = '/PayOrder';
    }
    $http(
        {
            method: "Get",
            url: "/Order/GetCart"
        }).then(function (response) {
            if (response.data === "") {
                $scope.Hide = "hide";
                $scope.Message = "show";
                $scope.table = "hide";
            }
            else {
                $scope.myData2 = response.data;
                totalMoney();
            }
        })
    $http(
        {
            method: "Get",
            url: "/Order/QuantityOrder"
        }).then(function (response) {
            $scope.count = response.data;
        })

    $scope.setOrder = function (id) {
        $http(
            {
                method: "POST",
                url: "/Order/AddCard",
                dataType: 'json',
                data: { iMaSp: id },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data === "") {
                    $scope.Hide = "hide";
                    $scope.myData = null;
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.error('Thêm sản phẩm', 'Không thêm thành công!');
                }
                else {

                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Thêm sản phẩm', 'Đã thêm sản phẩm vào giỏ hàng');
                }
            });


    }
    $scope.quantity = function (id) {
        $http(
            {
                method: "POST",
                url: "/Order/FindPro",
                dataType: 'json',
                data: {
                    iMaSp: id
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data == "") {
                    $scope.Product2 = null;
                }
                else {
                    $scope.Product2 = response.data;
                }
            });
    }
    
    function totalMoney() {
        $http(
            {
                method: "get",
                url: "/Order/TotalMoney",
            }).then(function (response) {
                $scope.totalMoney = response.data;
            })
    }
    $scope.EditQuantity = function (id, quantity) {
        $http(
            {
                method: "POST",
                url: "/Order/UpdateQuantity",
                dataType: 'json',
                data: {
                    Quantity: quantity,
                    Id: id
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data == "") {
                    $scope.Product2 = null;
                }
                else {
                    $scope.Product2 = response.data;
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Cập nhập số lượng', 'Đã cập nhập số lượng vào giỏ hàng');
                    $http(
                        {
                            method: "Get",
                            url: "/Order/GetCart"
                        }).then(function (response) {
                            if (response.data == "") {
                                $scope.Message = "show";
                                $scope.table = "hide";
                                $scope.myData2 = null;
                            }
                            else {
                                $scope.Message = "hide";
                                $scope.table = "show";
                                $scope.myData2 = response.data;
                                totalMoney();
                            }
                        })
                }

            });
    }
    $scope.Delete1 = function (id) {
        $http(
            {
                method: "POST",
                url: "/Order/FindPro",
                dataType: 'json',
                data: {
                    iMaSp: id
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data == "") {
                    $scope.Product3 = null;
                }
                else {

                    $scope.Product3 = response.data;
                    totalMoney();
                }
            });
    }
    $scope.Delete2 = function (id) {
        $http(
            {
                method: "POST",
                url: "/Order/Delete",
                dataType: 'json',
                data: {
                    _IdProd: id
                },
                headers: { "Content-Type": "application/json" }
            }).then(function (response) {
                if (response.data == "") {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.error('Xóa sản phẩm', 'Đã xóa thất bại !!');
                }
                else {

                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Xóa sản phẩm', 'Đã xóa ' + response.data + ' khỏi giỏ hàng');
                    totalMoney();
                    $http(
                        {
                            method: "Get",
                            url: "/Order/GetCart"
                        }).then(function (response) {
                            if (response.data === "") {
                                $scope.Message = "show";
                                $scope.table = "hide";
                                $scope.myData2 = null;
                            }
                            else {
                                $scope.Message = "hide";
                                $scope.table = "show";
                                $scope.myData2 = response.data;
                            }
                        })
                }
            });
    }
    $scope.DeleteAll = function () {
        $http(
            {
                method: "Get",
                url: "/Order/DeleteAll"
            }).then(function (response) {
                if (response.data == "") {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Xóa sản phẩm', 'Đã xóa thất bại!!');
                }
                else {
                    $notify.setTime(2).setPosition('bottom-right').showCloseButton(true).showProgressBar(true);
                    $notify.setPosition('bottom-left');
                    $notify.success('Xóa sản phẩm', 'Đã xóa tất cả khỏi giỏ hàng!');
                    totalMoney();
                    $http(
                        {
                            method: "Get",
                            url: "/Order/GetCart"
                        }).then(function (response) {
                            if (response.data == "") {
                                $scope.Message = "show";
                                $scope.table = "hide";
                                $scope.myData2 = null;
                            }
                            else {
                                
                                $scope.Message = "hide";
                                $scope.table = "show";
                                $scope.myData2 = response.data;
                            }
                        })
                }
            })
    }
});



