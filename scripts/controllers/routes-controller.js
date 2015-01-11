app.controller('RoutesController', function ($scope, Data, messages, $location, $http, $q) {
    $scope.logout = function () {
        Data.user.logout($http, $q)
                .then(function (data) {
                    messages.successMessage('Successfully logged out.');
                    $location.path('/home');
                })
    }
    $scope.$watch(function () {
        return $location.path();
    }, function (path) {
        $scope.guestNav =
        $scope.userNav =
        $scope.adminNav =
        $scope.userLogged = false;

        if (path.indexOf('/user/ads/edit') > -1) {
            $scope.userNav = true;
            $scope.headerText = 'Edit Ad';
        }
        else
            switch (path) {
                case '/home':
                    $scope.guestNav = true;
                    $scope.headerText = 'Home';
                    break;
                case '/register':
                    $scope.guestNav = true;
                    $scope.headerText = 'Register';
                    break;
                case '/login':
                    $scope.guestNav = true;
                    $scope.headerText = 'Login';
                    break;
                case '/user/home':
                    $scope.userNav = true;
                    $scope.headerText = 'Home';
                    break;
                case '/user/ads':
                    $scope.userNav = true;
                    $scope.headerText = 'My Ads';
                    break;
                case '/user/ads/publish':
                    $scope.userNav = true;
                    $scope.headerText = 'Publish New Ad';
                    break;
                case '/user/ads/delete':
                    $scope.userNav = true;
                    $scope.headerText = 'Delete Ad';
                    break;
                case '/user/profile':
                    $scope.userNav = true;
                    $scope.headerText = 'Edit User Profile';
                    break;
                case '/admin/home':
                    $scope.adminNav = true;
                    $scope.headerText = 'Admin';
                    break;
            
        }

        if ($scope.userNav || $scope.adminNav) {
            $scope.userLogged = Data.credentials.checkUserAccess($location);
            $scope.userName = Data.credentials.getUsername();

            if ($scope.adminNav) {
                if (!Data.credentials.isUserAdmin()) {
                    $location.path('/');
                }
            }
        }
    });
});