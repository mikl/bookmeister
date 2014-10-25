import Ember from 'ember';

export default Ember.Controller.extend({
  // Bound variable for new bookmark form.
  newBookmarkURL: '',

  actions: {
    saveNewBookmark: function () {
      var bookmark;
      var url = this.get('newBookmarkURL', '');

      if (url.length > 3) {
        bookmark = this.store.createRecord('bookmark');
        bookmark.set('url', url);

        // Save, and when that succeeds, proceed to edit the bookmark.
        bookmark.save().then(function (newBm) {
          this.transitionToRoute('bookmarks.edit', newBm.get('id'));
        }.bind(this));

        // Reset the input field to prevent double posts.
        this.set('newBookmarkURL', '');
      }
    }
  }
});
