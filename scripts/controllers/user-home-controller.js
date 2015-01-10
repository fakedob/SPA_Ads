(function () {
    app.controller('UserHomeController', function (adsPerPage, maxPagerSize, $scope, Data, $anchorScroll, $location, $http, $q) {
        if (Data.credentials.checkUserAccess($location)) {
            $scope.currentPage = 1;
            $scope.adsPerPage = adsPerPage;
            $scope.maxSize = maxPagerSize;
            $scope.currentCategory = 0;
            $scope.currentTown = 0;
            $scope.changePage = function () {
                Data.ads.getGuestAll(0, 0, $scope.adsPerPage, $scope.currentPage, $http, $q)
                    .then(function (data) {
                        $scope.ads = data;
                        $('html, body').animate({ scrollTop: 0 }, 'slow');
                    });
            };

            $scope.filterAdsByCategory = function (categoryId) {
                $scope.currentCategory = categoryId;
                processAds();
            };

            $scope.filterAdsByTown = function (townId) {
                $scope.currentCategory = townId;
                processAds();
            };

            var processAds = function () {
                Data.ads.getGuestAll($scope.currentCategory, $scope.currentTown, $scope.currentPage, $scope.adsPerPage, $http, $q)
                .then(function (data) {
                    $scope.ads = data;
                    $scope.totalItems = data.numItems;
                });
            }

            processAds();

            Data.common.getAllCategories($http, $q)
                .then(function (data) {
                    $scope.categories = data;
                },
                function (error) {
                    console.log(error);
                });

            Data.common.getAllTowns($http, $q)
                .then(function (data) {
                    $scope.towns = data;
                },
                function (error) {
                    console.log(error);
                });
        }
    })
}());