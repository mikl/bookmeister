import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.resource('bookmarks', {path: "/bookmark"}, function() {
    this.route('edit', {path: "/bookmark/:bookmark_id"});
    this.route('delete', {path: "/bookmark/:bookmark_id/delete"});
  });

  this.resource('node', function() {
    this.route('edit', { path: ':id/edit'});
    this.route('delete', { path: ':id/delete'});
  });
});
