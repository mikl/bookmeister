import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTSerializer.extend({
  // Decamelize and lowercase keys sent to the server.
  keyForAttribute: function (attr) {
    return Ember.String.underscore(attr);
  }
});
