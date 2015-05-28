import Ember from 'ember';

export default Ember.Route.extend({
  // The node view presents a list of nodes.
  model: function () {
    return this.store.find('node');
  }
});
