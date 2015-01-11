'use strict';

var app = angular
    .module('app', ['ngRoute', 'ui.bootstrap', 'naif.base64'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/home',
            {
                templateUrl: 'views/guest/home.html'
            })
            .when('/login',
            {
                templateUrl: 'views/guest/login.html'
            })
            .when('/register',
            {
                templateUrl: 'views/guest/registration.html'
            })
            .when('/user/home',
            {
                templateUrl: 'views/user/home.html'
            })
            .when('/user/ads',
            {
                templateUrl: 'views/user/ads.html'
            })
            .when('/user/ads/publish',
            {
                templateUrl: 'views/user/publish-ad.html'
            })
            .when('/user/ads/edit/:id',
            {
                templateUrl: 'views/user/edit-ad.html'
            })
            .when('/user/ads/delete',
            {
                templateUrl: 'views/user/delete-ad.html'
            })
            .when('/user/profile',
            {
                templateUrl: 'views/user/edit-profile.html'
            })
            .when('/admin/home',
            {
                templateUrl: 'views/user/edit-profile.html'
            })
            .when('/loading',
            {
                templateUrl: 'views/loading.html'
            })
            .otherwise({
                redirectTo: '/loading'
            })
    })
    .constant(
    {
        'adsPerPage': 2,
        'maxPagerSize': 5
    });

var baseUrl = 'http://localhost:1337/api'

var adsPerPage = 2;
var maxPagerSize = 5