app.controller('UserAdsController', function ($scope, Data, messages, adsPerPage, maxPagerSize, $location, $http, $q) {
    $scope.currentPage = 1;
    $scope.adsPerPage = adsPerPage;
    $scope.maxSize = maxPagerSize;

    $scope.showPager = false;

    $scope.changePage = function () {
        Data.ads.getUserAll(-1, $scope.currentPage, $scope.adsPerPage, $http, $q)
            .then(function (data) {
                $scope.userAds = data;
                $('html, body').animate({ scrollTop: 0 }, 'slow');
            });
    };

    $scope.editAd = function (adID) {
        $location.path('/user/ads/edit/' + adID);
    }

    $scope.deactivateAd = function (adId) {
        Data.ads.deactivate(adId, $http, $q)
        .then(function (data) {
            Data.ads.getUserAll(-1, $scope.currentPage, $scope.adsPerPage, $http, $q)
            .then(function (idata) {
                $scope.userAds = idata;
                $scope.totalItems = idata.numItems;
                $scope.showPager = idata.numItems > $scope.adsPerPage;
            })

        });
    }
    $scope.publishAgainAd = function (adId) {
        Data.ads.publishAgain(adId, $http, $q)
        .then(function (data) {
            Data.ads.getUserAll(-1, $scope.currentPage, $scope.adsPerPage, $http, $q)
            .then(function (idata) {
                console.log(idata)
                $scope.userAds = idata;
                $scope.totalItems = idata.numItems;
                $scope.showPager = idata.numItems > $scope.adsPerPage;
            })
        });
    }

    Data.ads.getUserAll(-1, $scope.currentPage, $scope.adsPerPage, $http, $q)
    .then(function (data) {
        $scope.userAds = data;
        $scope.totalItems = data.numItems;
        $scope.showPager = $scope.currentPage == 1 && data.numItems == 0;
    })
});