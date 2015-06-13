import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    cancel: function () {
      this.transitionToRoute('bookmarks');
    },

    confirmDeletion: function () {
      this.get('model').destroyRecord().then(() => {
        this.transitionToRoute('bookmarks');
      });
    }
  }
});
