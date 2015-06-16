import DS from 'ember-data';
import config from '../config/environment';

export default DS.RESTAdapter.extend({
  host: config.bookmeisterServer,

  /**
   * Generate a random UUID for new models.
   */
  generateIdForRecord: function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (char) {
      var randVal = Math.random() * 16 | 0;

      var hexdigit;

      if (char === 'x') {
        hexdigit = randVal;
      } else {
        hexdigit = (randVal & 0x3 | 0x8);
      }

      return hexdigit.toString(16);
    });
  },
});
