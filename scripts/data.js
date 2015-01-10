'use strict';

app.factory('Data', function ($http, $q, messages) {
    var globalCredentials;

    function Data(baseUrl, ajaxRequester) {
        this.credentials = new credentials();
        this.user = new User(baseUrl, ajaxRequester);
        this.ads = new Ads(baseUrl, ajaxRequester);
        this.common = new Common(baseUrl, ajaxRequester);
    }

    var credentials = (function (argument) {
        function credentials() {
            this.getSessionToken = getSessionToken;
            this.setSessionToken = setSessionToken;
            this.removeSessionToken = removeSessionToken;
            this.setUsername = setUsername;
            this.getUsername = getUsername;
            this.getHeaders = getHeaders;
            this.checkUserAccess = checkUserAccess;
            this.isUserAdmin = isUserAdmin;
            globalCredentials = this;
        }

        function checkUserAccess($location) {
            if (hasToken()) {
                return true;
            }
            $location.path('/home');
            return false;
        }

        var headers = {
            'Authorization': 'Bearer ' + getSessionToken()
        }

        function getSessionToken() {
            return localStorage.getItem('sessionToken');
        }

        function isUserAdmin() {
            var isAdmin = localStorage.getItem('isAdmin');
            if (isAdmin !== null && isAdmin == 'true') {
                return true;
            }
            return false;
        }

        function setSessionToken(data) {
            var sessionToken = data.access_token,
                      expiryDate = new Date(data['.expires']);
            var isAdmin = false;
            if (data.isAdmin) {
                localStorage.setItem('isAdmin', true);
            }
            localStorage.setItem('sessionExpire', expiryDate);
            localStorage.setItem('sessionToken', sessionToken);
        }

        function getUsername() {
            return localStorage.getItem('username');
        }

        function setUsername(sessionToken) {
            localStorage.setItem('username', sessionToken);
        }

        function getHeaders() {
            return headers;
        }
        function hasToken() {
            var myToken = getSessionToken();
            if (myToken === null || localStorage.getItem('sessionExpire') === null) {
                removeSessionToken();
                return false;
            }
            else {
                if (new Date(localStorage.getItem('sessionExpire')) <= new Date()) {
                    removeSessionToken();
                    return false;
                }
                else {
                    return true;
                }
            }
        }
        function removeSessionToken() {
            localStorage.removeItem('sessionToken');
            localStorage.removeItem('sessionExpire');
            localStorage.removeItem('username');
            localStorage.removeItem('isAdmin');
        }
        return credentials;
    }());

    var User = (function (argument) {
        function User(baseUrl, ajaxRequester) {
            this._serviceUrl = baseUrl + '/user/';
            this._ajaxRequester = ajaxRequester;
            this._headers = globalCredentials.getHeaders;
        }

        User.prototype.login = function (userData, $http, $q) {
            var url = this._serviceUrl + 'Login';
            return this._ajaxRequester.post(url, userData, this._headers(), $http, $q)
				.then(function (data) {
				    globalCredentials.setSessionToken(data);
				    globalCredentials.setUsername(data.username);
				    return data;
				});
        }

        User.prototype.register = function (data, $http, $q) {
            var url = this._serviceUrl + 'Register';
            return this._ajaxRequester.post(url, data, this._headers(), $http, $q)
				.then(function (data) {
                    globalCredentials.setSessionToken(data.sessionToken);
				    return data;
				});
        }
        User.prototype.logout = function ($http, $q) {
            var url = this._serviceUrl + 'Logout';

            return this._ajaxRequester.post(url, null, this._headers(), $http, $q)
				.then(function (data) {
				    globalCredentials.removeSessionToken();
				    return data;
				});
        }

        User.prototype.changePassword = function (data, $http, $q) {
            var url = this._serviceUrl + 'ChangePassword';
            return this._ajaxRequester.put(url, data, this._headers())
				.then(function (data) {
				    return data;
				});
        }

        User.prototype.getProfile = function (objectId, $http, $q) {
            return this._ajaxRequester.get(this._serviceUrl + 'Profile/' + objectId, this._headers());
        }

        User.prototype.editProfile = function (data, $http, $q) {
            var url = this._serviceUrl + 'Profile';
            return this._ajaxRequester.put(url, data, this._headers())
				.then(function (data) {
				    return data;
				});
        }

        return User;
    }());
    var Ads = (function (argument) {
        function Ads(baseUrl, ajaxRequester) {
            this._serviceUrl = baseUrl + '/user/Ads';
            this._serviceGuestUrl = baseUrl + '/Ads';
            this._ajaxRequester = ajaxRequester;
            this._headers = globalCredentials.getHeaders;
        }

        Ads.prototype.add = function (ad, $http, $q) {
            return this._ajaxRequester.post(this._serviceUrl, ad, this._headers(), $http, $q);
        }

        Ads.prototype.getUserAll = function (status, startPage, pageSize, $http, $q) {
            return this._ajaxRequester.get(this._serviceUrl + '?Status=' + status + '&StartPage=' + startPage + '&PageSize=' + pageSize, this._headers(), $http, $q);
        }

        Ads.prototype.getGuestAll = function (categoryId, townId, startPage, pageSize, $http, $q) {
            var params = '?';
            if (categoryId > 0) {
                params += 'CategoryId=' + categoryId;
            }
            if (townId > 0) {
                if (categoryId > 0) {
                    params += '&';
                }
                params += 'townId=' + townId;
            }
            return this._ajaxRequester.get(this._serviceGuestUrl + params + '&StartPage=' + startPage + '&PageSize=' + pageSize, this._headers(), $http, $q);
        }

        Ads.prototype.getAllCategories = function () {

        }

        Ads.prototype.deactivate = function (objectId, $http, $q) {
            var url = this._serviceUrl + '/Deactivate/' + objectId;
            return this._ajaxRequester.put(url, null, this._headers(), $http, $q);
        }
        Ads.prototype.publishAgain = function (objectId, $http, $q) {
            var url = this._serviceUrl + '/PublishAgain/' + objectId;
            return this._ajaxRequester.put(url, null, this._headers(), $http, $q);
        }

        Ads.prototype.getById = function (objectId, $http, $q) {
            return this._ajaxRequester.get(this._serviceUrl + '/' + objectId, this._headers(), $http, $q);
        }

        Ads.prototype.edit = function (objectId, ad, $http, $q) {
            var url = this._serviceUrl + '/' + objectId;
            return this._ajaxRequester.put(url, ad, this._headers(), $http, $q);
        }

        Ads.prototype.delete = function (objectId, $http, $q) {
            var url = this._serviceUrl + '/' + objectId;
            return this._ajaxRequester.delete(url, this._headers(), $http, $q);
        }

        return Ads;
    }());

    var Common = (function () {
        function Common(baseUrl, ajaxRequester) {
            this._catUrl = baseUrl + '/categories';
            this._townsUrl = baseUrl + '/towns';
            this._ajaxRequester = ajaxRequester;
            this._headers = globalCredentials.getHeaders;
        }

        Common.prototype.getAllCategories = function ($http, $q) {
            return this._ajaxRequester.get(this._catUrl,  this._headers(), $http, $q);
        }

        Common.prototype.getAllTowns = function () {
            return this._ajaxRequester.get(this._townsUrl,  this._headers(), $http, $q);
        }

        return Common;
    }())

    return new Data(baseUrl, ajaxRequester.get(messages));
});