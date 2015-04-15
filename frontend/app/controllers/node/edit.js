import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    cancel: function (model) {
      this.transitionToRoute('node');
    },

    save: function (model) {
      model.save().then(function() {
        this.transitionToRoute('node');
      }.bind(this));
    }
  }
});
