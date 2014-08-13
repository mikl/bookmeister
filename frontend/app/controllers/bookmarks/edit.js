import Ember from 'ember';

export default Ember.ObjectController.extend({
  actions: {
    saveBookmark: function () {
      this.get('model').save();

      this.transitionToRoute('bookmarks');
    }
  }
});
