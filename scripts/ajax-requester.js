var ajaxRequester = (function () {
    var messages;
    function AjaxRequester(_messages) {
		this.get = makeGetRequest;
		this.post = makePostRequest;
		this.put = makePutRequest;
		this.delete = makeDeleteRequest;
		messages = _messages
	}

    var makeRequest = function (url, method, data, headers, $http, $q) {

		var req = {
		    method: method,
		    url: url,
		    headers: headers,
		    data: data,
		}

		var defer = $q.defer();
        $http(req).success(function (response) {
	        defer.resolve(response);
        }).error(function (response) {
	        var errorMessage = 'The system experienced an unhandled exception (Server side).';

            //if 401 reset session and redirect

	        if (response == null) {
	            errorMessage = 'Please check your network connection.'
	        }
	        else if (response.error_description) {
	            errorMessage = response.error_description;
	        }
	        else if (response.modelState && response.modelState.status) {
	            errorMessage = response.modelState.status;
	        }
	        else if (response.modelState && response.modelState[''].length > 0) {
	            errorMessage = $("<ul/>");
	            for (var e = 0; e < response.modelState[''].length; e++) {
	                errorMessage.append($('<li>' + response.modelState[''][e] + '</li>'));
	            }
	            errorMessage = errorMessage.prop('outerHTML');
	        }
	        messages.errorMessage(errorMessage);
	        defer.reject(response);
		});

		return defer.promise;
	}

    var makeGetRequest = function (url, headers, $http, $q) {
        return makeRequest(url, 'GET', null, headers, $http, $q);
	}

    var makePostRequest = function (url, data, headers, $http, $q) {
        return makeRequest(url, 'POST', data, headers, $http, $q);
	}

    var makePutRequest = function (url, data, headers, $http, $q) {
        return makeRequest(url, 'PUT', data, headers, $http, $q);
	}

    var makeDeleteRequest = function (url, headers, $http, $q) {
        return makeRequest(url, 'DELETE', null, headers, $http, $q);
	}

	return {
	    get: function (messages) {
	        return new AjaxRequester(messages);
		}
	}
}());