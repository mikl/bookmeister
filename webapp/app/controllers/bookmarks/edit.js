import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    cancel: function () {
      this.get('model').rollback();

      this.transitionToRoute('bookmarks');
    },

    saveBookmark: function () {
      this.get('model').save();

      this.transitionToRoute('bookmarks');
    }
  }
});
