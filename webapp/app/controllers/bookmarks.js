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

        var onSuccess = function (bookmark) {
          this.transitionToRoute('bookmarks.edit', bookmark);
        }.bind(this);

        var onFail = function () {
          console.error('Saving bookmark failed', arguments);
        }.bind(this);

        bookmark.save().then(onSuccess, onFail);

        // Reset the input field to prevent double posts.
        this.set('newBookmarkURL', '');
      }
    }
  }
});
