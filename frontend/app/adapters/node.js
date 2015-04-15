import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  buildURL: function (type, id, record) {
    var url = [],
      host = Ember.get(this, 'host'),
      prefix = this.urlPrefix();

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
