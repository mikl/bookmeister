import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  primaryKey: 'nid',

  // Decamelize and lowercase keys sent to the server.
  keyForAttribute: function(attr) {
    return Ember.String.underscore(attr);
  },

  extractArray: function (store, primaryType, payload) {
    return payload.map(function (item) {
      return this.extractSingle(store, primaryType, item);
    }.bind(this))
  },

  extractSingle: function(store, type, payload) {
    let processed = {};

    if (payload.nid && payload.nid[0] && payload.nid[0].value) {
      processed.id = payload.nid[0].value;
    }

    // Single-value fields.
    let fieldNames = ['vid', 'uuid', 'type', 'title', 'uid', 'created', 'changed'];
    fieldNames.forEach(function (fieldName) {
      // If the value is stored as `value`.
      if (payload[fieldName] && payload[fieldName][0] && payload[fieldName][0].value) {
        processed[fieldName] = payload[fieldName][0].value;
      }
      // If the value is stored as `target_id`.
      else if (payload[fieldName] && payload[fieldName][0] && payload[fieldName][0].target_id) {
        processed[fieldName] = payload[fieldName][0].target_id;
      }
    });

    return processed;
  }
});
