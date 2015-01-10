'use strict';

app.factory('authData', function($http, $q){
    function register(targetUrl, userData) {
        var defer = $q.defer();
        $http.post(targetUrl + 'user/register', userData)
            .success(function (data, status, headers, config) {
                defer.resolve(data);

            })
            .error(function (data, status, headers, config) {
                defer.reject(data);
            });

        return defer.promise;
    }

    function login(targetUrl, userData) {
        var defer = $q.defer();
        console.log(userData)
        $http.post(targetUrl + 'user/login', userData)
            .success(function (data, status, headers, config) {
                defer.resolve(data);
                console.log(data)

            })
            .error(function (data, status, headers, config) {
                defer.reject(data);
            });

        return defer.promise;
    }

    return{
        register: register,
        login : login
    }
});