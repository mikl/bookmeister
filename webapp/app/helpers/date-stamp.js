import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(value) {
  var date = moment(value);

  if (date.isValid()) {
    return new Ember.Handlebars.SafeString(
      '<time datetime="' + value + '">' + date.fromNow() + '</time>'
    );
  }
});
