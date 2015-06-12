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

        var onSuccess = function(post) {
          this.transitionToRoute('bookmarks.edit', bookmark);
        }.bind(this);

        var onFail = function(post) {
          console.error('Saving bookmark failed');
        }.bind(this);

        bookmark.save().then(onSuccess, onFail);

        // Reset the input field to prevent double posts.
        this.set('newBookmarkURL', '');
      }
    }
  }
});
