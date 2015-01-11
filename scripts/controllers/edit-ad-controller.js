app.controller('EditAdController', function ($scope, Data, $routeParams, messages, $location, $http, $q) {
    $scope.editAd = function (adData, adForm) {
        adData.CategoryId = adData.categoryId;
        adData.TownId = adData.townId;
        Data.ads.edit($routeParams.id, adData, $http, $q)
        .then(function (data) {
            messages.successMessage('Ad edited successfully');
            $location.path('/user/ads');
        })
    }
    $scope.getAd = function () {
        Data.common.getAllCategories($http, $q)
         .then(function (data) {
             $scope.categories = data;

             Data.common.getAllTowns($http, $q)
                .then(function (tdata) {
                    $scope.towns = tdata;

                    Data.ads.getById($routeParams.id, $http, $q)
                        .then(function (adata) {
                            $scope.ad = adata;
                            console.log(data);
                        });
                })

         })
    }});