app.controller('PublishAdController', function ($scope, Data, messages, $location, $http, $q) {
    Data.common.getAllCategories($http, $q)
    .then(function (data) {
        $scope.categories = data;
    })

    Data.common.getAllTowns($http, $q)
    .then(function (data) {
        $scope.towns = data;
    })
    $scope.publishAd = function (adData, adForm) {
        if (adData.imageDataURL) {
            adData.imageDataURL = 'data:' + adData.imageDataURL.filetype + ';base64,' + adData.imageDataURL.base64;
        }

        Data.ads.add(adData, $http, $q)
        .then(function (data) {
            messages.successMessage(data.message);
            $location.path('/user/ads');
        })
    }
});