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
        if (adData.image) {
            adData.image = 'data:' + adData.image.filetype + ';base64,' + adData.image.base64;
        }

        Data.ads.add(adData, $http, $q)
        .then(function (data) {
            messages.successMessage(data.message);
        })
    }
});