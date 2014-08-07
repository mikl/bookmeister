import Ember from 'ember';

export default Ember.ArrayController.extend({
  // Bound variable for new bookmark form.
  newBookmarkURL: '',

  actions: {
    saveNewBookmark: function () {
      var bookmark;
      var url = this.get('newBookmarkURL', '');

      if (url.length > 3) {
        bookmark = this.store.createRecord('bookmark');
        bookmark.set('url', url);
        bookmark.save();

        // Reset the input field to prevent double posts.
        this.set('newBookmarkURL', '');

        this.transitionToRoute('bookmarks.bookmark', bookmark.get('id'));
      }
    }
  }
});
