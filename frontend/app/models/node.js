import DS from 'ember-data';

export default DS.Model.extend({
  uuid: DS.attr('string'),
  vid: DS.attr('number'),
  type: DS.attr('string'),
  langcode: DS.attr('string'),
  title: DS.attr('string'),
  uid: DS.attr('number'),
  created: DS.attr('number'),
  changed: DS.attr('number'),
  status: DS.attr('number'),
  body: DS.attr('string')
});
