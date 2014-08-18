export default {
  name: 'drupal-csrf-token',

  initialize: function(container, app) {
    app.inject('route', 'drupalCsrfToken', 'service:drupalCsrfToken');
    app.inject('controller', 'drupalCsrfToken', 'service:drupalCsrfToken');
  }
};
