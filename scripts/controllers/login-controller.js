app.controller('LoginController', function ($scope, Data, messages, $location, $http, $q) {
    $scope.login = function (userData, loginForm) {
        $scope.loginForm = loginForm;
        $scope.user = userData;

        if($scope.loginForm.$valid){
            Data.user.login(userData, $http, $q)
                .then(function (data) {
                    messages.successMessage('Welcome ' + data.username);
                    $location.path('/loading');
                })
        }
    }
});