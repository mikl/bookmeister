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

Bookmark.reopenClass({
  FIXTURES: [
    { id: 1, url: 'http://mikkel.hoegh.org/', title: "Mikkel Høgh" },
    { id: 2, url: 'http://hoegh.io/', title: "Högh I+O" },
    { id: 3, url: 'http://rhabarberbarbarabarbarbarenbartbarbierbierbar.com/', title: "Rhabarberbarbara" },
    { id: 4, url: 'http://emberjs.com/', title: "Ember.js" },
    { id: 5, url: 'http://drupal.org/', title: "Drupal" }
  ]
});

export default Bookmark;
