import Ember from 'ember';

export default Ember.ObjectController.extend({
  actions: {
    cancel: function () {
      // Go back to the overview.
      this.transitionToRoute('bookmarks');
    },

    saveBookmark: function () {
      // Save the new bookmark.
      this.get('model').save();

      // And go back to the overview.
      this.transitionToRoute('bookmarks');
    }
  }
});
