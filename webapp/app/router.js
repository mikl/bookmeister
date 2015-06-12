import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('bookmarks', function() {
    this.route('edit', {path: ":bookmark_id"});
    this.route('delete', {path: ":bookmark_id/delete"});
  });
});

export default Router;
