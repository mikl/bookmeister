import DS from 'ember-data';

var Bookmark = DS.Model.extend({
  url: DS.attr('string'),
});

Bookmark.reopenClass({
  FIXTURES: [
    { id: 1, url: 'http://mikkel.hoegh.org/' },
    { id: 2, url: 'http://hoegh.io/' },
    { id: 3, url: 'http://rhabarberbarbarabarbarbarenbartbarbierbierbar.com/' }
  ]
});

export default Bookmark;
