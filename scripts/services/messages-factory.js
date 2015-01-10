'use strict';

app.factory('messages', function () {
    function showSuccessMessage(message) {

        noty({
            text: '<h4>' + message + '<h4>',
            layout: 'topCenter',
            timeout: 3000,
            type: 'success'
        })
    }

    function showErrorMessage(message) {

        noty({
            text: '<h4>' + message + '<h4>',
            layout: 'topCenter',
            timeout: 3000,
            type: 'error'
        })
    }

  return{
      successMessage : showSuccessMessage,
      errorMessage : showErrorMessage
  }
});