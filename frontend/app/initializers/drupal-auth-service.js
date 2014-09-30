export default {
  name: 'drupal-auth-service',

  initialize: function(container, app) {
    // Make the service a singleton, so it can keep login state and CSRF tokens
    // for the whole application.
    app.register('service:drupalAuth', 'drupal-auth', { singleton: true });

    app.inject('controller', 'drupalAuthService', 'service:drupal-auth');
    app.inject('route', 'drupalAuthService', 'service:drupal-auth');
    app.inject('model', 'drupalAuthService', 'service:drupal-auth');
  }
};
