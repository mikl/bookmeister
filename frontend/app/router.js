import Ember from 'ember';

var Router = Ember.Router.extend({
  location: BookmeisterENV.locationType
});

Router.map(function() {
  this.resource('bookmarks', {path: "/"}, function() {
    this.route('bookmark', {path: "/bookmark/:bookmark_id"});
  });
});

export default Router;
