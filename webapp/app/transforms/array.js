import DS from 'ember-data';
import Ember from 'ember';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    if (Ember.typeOf(serialized) === "array") {
      return serialized;
    }
    else {
      return [];
    }
  },

  serialize: function(deserialized) {
    let type = Ember.typeOf(deserialized);

    // We don't actually serialize our array here, since it'll be
    // serialized just fine along with the full model object later.
    if (type === 'array') {
      return deserialized;
    } else if (type === 'string') {
      return deserialized.split(',');
    } else {
      return [];
    }
  }
});
