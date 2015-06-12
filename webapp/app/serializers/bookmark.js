import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  // Decamelize and lowercase keys sent to the server.
  keyForAttribute: function (attr) {
    return Ember.String.underscore(attr);
  }
});
