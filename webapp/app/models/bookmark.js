import DS from 'ember-data';

var Bookmark = DS.Model.extend({
  uuid: DS.attr('string'),
  url: DS.attr('string'),
  title: DS.attr('string'),
  description: DS.attr('string'),
  addedAt: DS.attr('date', {
    defaultValue: function() { return moment().format(); }
  }),
  createdAt: DS.attr('date', {
    defaultValue: function() { return moment().format(); }
  }),
  updatedAt: DS.attr('date'),

  displayName: function() {
    if (this.get('title')) {
      return this.get('title');
    }

    return this.get('url');
  }.property('url', 'title')
});

export default Bookmark;
