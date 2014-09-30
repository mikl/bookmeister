import Ember from 'ember';
import config from '../config/environment';

var csrfTokenRequest;

export default Ember.Object.extend({
  getCsrfToken: function () {
    // If the CSRF request was not already created, create it.
    if (!csrfTokenRequest) {
      csrfTokenRequest = Ember.$.ajax({
        contentType: 'application/json',
        dataType: 'json',
        type: 'POST',
        url: config.bookmeisterServer + '/api/bookmeister/user/token.json'
      });
    }

    // Return the promise so it can be used by the caller.
    return csrfTokenRequest;
  }


});

