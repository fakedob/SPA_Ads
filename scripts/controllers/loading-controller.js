app.controller('AppInit', function (Data, $location) {
    if (Data.credentials.checkUserAccess($location)) {
        if (Data.credentials.isUserAdmin()) {
            $location.path('/admin/home');
        }
        else {
            $location.path('/user/home');
        }
    }
});