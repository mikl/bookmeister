import Ember from 'ember';

export default Ember.ObjectController.extend({
  actions: {
    cancel: function () {
      this.transitionToRoute('bookmarks');
    },

    confirmDeletion: function () {
      var controller = this;

      this.get('model').deleteRecord();
      this.get('model').save()
        .then(function () {
          controller.transitionToRoute('bookmarks');
        });

    }
  }
});
