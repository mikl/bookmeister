"use strict";
import ApplicationAdapter from './application';
import Ember from 'ember';

export default ApplicationAdapter.extend({
  buildURL: function (type, id, record) {
    var url = [],
      host = Ember.get(this, 'host'),
      prefix = this.urlPrefix();

    if (Ember.$.isNumeric(id)) {
      url.push('bookmeister_bookmark/' + parseInt(id, 10) + '.json');
    }
    else {
      url.push('bookmeister_bookmark.json');
    }


    if (prefix) { url.unshift(prefix); }

    url = url.join('/');
    if (!host && url) { url = '/' + url; }

    return url;
  }
});
