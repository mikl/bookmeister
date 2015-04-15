import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  ajax: function (url, type, options) {
    // Instruct the browser to pass cookies along via CORS, so we can piggyback
    // on the standard Drupal login.
    options.xhrFields = { withCredentials: true };

    return this._super(url, type, options);
  },

  buildURL: function (type, id, record) {
    let url = [];
    let host = this.get('host');
    let prefix = this.urlPrefix();

    if (Ember.$.isNumeric(id)) {
      url.push('node/' + parseInt(id, 10));
    }
    else {
      url.push('node/list');
    }

    if (prefix) { url.unshift(prefix); }

    url = url.join('/');
    if (!host && url) { url = '/' + url; }

    return url;
  }
});
