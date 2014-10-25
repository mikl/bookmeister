import Ember from 'ember';

export default Ember.ObjectController.extend({
  actions: {
    cancel: function () {
      this.transitionToRoute('bookmarks');
    },

    confirmDeletion: function () {
      this.get('model').deleteRecord();
      this.get('model').save()
        .then(function () {
          this.transitionToRoute('bookmarks');
        }.bind(this));

    }
  }
});
