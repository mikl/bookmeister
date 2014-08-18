import Ember from 'ember';

export default Ember.Object.extend({
  // Storage of previously loaded token.
  storedToken: null,

  token: function () {
    return 'test';
  }.property()
});
