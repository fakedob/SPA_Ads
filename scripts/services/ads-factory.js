'use strict';

app.factory('adsData', function adsData($http, $q, messages) {

    function getAllAdsPerPage(targetUrl, pageSize, startPage) {

        var defer = $q.defer();
        $http.get(targetUrl + '?pagesize=' + pageSize + '&startpage=' + startPage)
            .success(function (data, status, headers, config) {
                defer.resolve(data);
            })
            .error(function (data, status, headers, config) {
                defer.reject(data);
            });

        return defer.promise;
    }

    function getAll(targetUrl) {
        var defer = $q.defer();
        $http.get(targetUrl)
            .success(function (data, status, headers, config) {
                defer.resolve(data);
            })
            .error(function (data, status, headers, config) {
                var errorMessage = 'The system experienced an unhandled error.';
                if (data.modelState[''] !== 'undefined' && data.modelState[''].length > 0) {
                    errorMessage = $("<ul/>");
                    for (var e = 0; e < data.modelState[''].length; e++) {
                        errorMessage.append($('<li>' + data.modelState[''][e] + '</li>'));
                    }
                    errorMessage = errorMessage.prop('outerHTML');
                }
                messages.errorMessage(errorMessage);
                defer.reject(data);
            });

        return defer.promise;
    }

    function getAdsByCategory(targetUrl, categoryId) {
        var defer = $q.defer();
        $http.get(targetUrl + '?categoryid=' + categoryId)
            .success(function (data, status, headers, config) {
                defer.resolve(data);
            })
            .error(function (data, status, headers, config) {
                defer.reject(data);
            });
        return defer.promise;
    }

    return {
        getAllAdsPerPage: getAllAdsPerPage,
        getAllCategories: getAll,
        getAllTowns: getAll,
        getAdsByCategory: getAdsByCategory
    }
});