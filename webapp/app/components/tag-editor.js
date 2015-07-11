import Ember from 'ember';

export default Ember.Component.extend({
  _initialiseTagEditor: function () {
    let input = this.$('textarea');

    input.tagEditor({
      placeholder: 'Tags',

      onChange: (field, editor, tags) => {
        this.set('tags', tags || []);
      },
    });
  }.on('didInsertElement'),

  serializedTags: Ember.computed("tags", {
    get: function() {
      let tags = this.get('tags') || [];
      return tags.join(',');
    },

    set: function(key, value) {
      let tags = value.split(',');
      this.set('tags', tags || []);

      return this.get('tags').join(',');
    }
  })
});
