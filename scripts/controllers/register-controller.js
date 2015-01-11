app.controller('RegisterController', function ($scope, Data, messages, $location, $http, $q) {
    Data.common.getAllTowns()
        .then(function (data) {
            $scope.towns = data;
        });
    $scope.register = function (userData, registerForm) {
        if (registerForm.$valid) {
            Data.user.register(userData, $http, $q)
                .then(function (data) {
                    messages.successMessage('Your account has been successfully created. Please login.');
                    $location.path('/login');
                });
        }

    }
});