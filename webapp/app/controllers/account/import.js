import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Controller.extend({
  uploadUrl: config.bookmeisterServer + '/import',
});
