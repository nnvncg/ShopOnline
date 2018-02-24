/// <reference path="../scripts/angular.min.js" />

var filterScripts = angular.module('filterScripts', []);
filterScripts.filter('range', function () {
    return function (dataInput, start) {
        if (!dataInput || !dataInput.length) { return; }
        return dataInput.slice(start);
    }
})
    .filter('pageCount', function () {
        return function (dataInput, pageSize) {
            if (!dataInput || !dataInput.length) { return; }
            var temp = [];
            for (var i = 0; i < Math.ceil(dataInput.length / pageSize); i++) {
                temp.push(i);
            }
            return temp;
        }
    })
    .filter('status', function () {
        return function (status) {
            switch (status) {
                case true:
                    return "Có";
                case false:
                    return "Không";
            }
        }
    })
    .filter('seen', function () {
        return function (Status) {
            switch (Status) {
                case true:
                    return "Đã xem";
                case false:
                    return "Chưa xem";
            }
        }
    })
    .filter('typeComment', function () {
        return function (number) {
            switch (number) {
                case "1":
                    return "chưa xem";
                case "2":
                    return "tất cả";
                case "3":
                    return "theo ngày";
                case "4":
                    return "theo tuần";
                case "5":
                    return "theo tháng";

            }
        }
    })
    //.filter('Creator', function ($http) {
    //    return function (ID) {
    //        $http(
    //            {
    //                method: "POST",
    //                url: "/AccountAdmin/NameAccountById",
    //                dataType: 'json',
    //                data: { id=ID },
    //                headers: { "Content-Type": "application/json" }
    //            }).then(function (response) {
    //                return response.data;
    //            })
    //    }
    //} )
