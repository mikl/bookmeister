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
  updatedAt: DS.attr('date')
});

Bookmark.reopenClass({
  FIXTURES: [
    { id: 1, url: 'http://mikkel.hoegh.org/' },
    { id: 2, url: 'http://hoegh.io/' },
    { id: 3, url: 'http://rhabarberbarbarabarbarbarenbartbarbierbierbar.com/' }
  ]
});

export default Bookmark;
