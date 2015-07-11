/* global moment */
import DS from 'ember-data';

var Bookmark = DS.Model.extend({
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
  // Must be quoted, private is a reserved word.
  'private': DS.attr('boolean', {defaultValue: false}),
  toRead: DS.attr('boolean', {defaultValue: false}),
  tags: DS.attr('array', {defaultValue: []}),

  displayName: function() {
    if (this.get('title')) {
      return this.get('title');
    }

    return this.get('url');
  }.property('url', 'title')
});

export default Bookmark;
