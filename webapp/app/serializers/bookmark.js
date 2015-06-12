import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  extractArray: function(store, type, payload) {
    return payload.bookmarks;
  },

  // Decamelize and lowercase keys sent to the server.
  keyForAttribute: function (attr) {
    return Ember.String.underscore(attr);
  }
});
