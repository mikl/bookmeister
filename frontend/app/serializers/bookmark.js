import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  extractArray: function(store, type, payload) {
    return payload.list;
  },

  extractDeleteRecord: function(store, type, payload, id, requestType) {
    // RestWS sends an empty payload back on DELETE requests.
    // Make sure it's not interpreted by returning nothing here.
    return;
  },

  extractUpdateRecord: function(store, type, payload, id, requestType) {
    // RestWS sends an empty payload back on PUT requests.
    // Make sure it's not interpreted by returning nothing here.
    return;
  },

  extractSingle: function(store, type, payload) {
    return payload;
  },

  // Decamelize and lowercase keys sent to the server.
  keyForAttribute: function (attr) {
    return Ember.String.underscore(attr);
  },

  serialize: function(record, options) {
    var json = this._super.apply(this, arguments);

    Object.keys(json).forEach(function (key) {
      // Avoid sending NULL values back to the server.
      if (json[key] === null) {
        delete json[key];
      }
    });

    return json;
  }
});
