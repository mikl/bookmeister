"use strict";
import ApplicationAdapter from './application';
import Ember from 'ember';

export default ApplicationAdapter.extend({
  pathForType: function (type) {
    return 'bookmeister_bookmark.json';
  }
});
