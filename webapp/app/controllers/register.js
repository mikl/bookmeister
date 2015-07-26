import config from '../config/environment';
import Ember from 'ember';

export default Ember.Controller.extend({
  email: '',
  password: '',
  username: '',
  
  // Helper variable to prevent double submission.
  processing: false,

  actions: {
    register: function () {
      if (this.get('processing')) {
        return;
      }

      this.set('processing', true);

      let payload = {
        account: {
          email: this.get('email'),
          password: this.get('password'),
          username: this.get('username')
        }
      };

      Ember.$.ajax({
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(payload),
        method: 'POST',
        url: config.bookmeisterServer + '/account/register',

        error: function () {
          console.error('Account creation failed', arguments);
          this.transitionToRoute('error');
        }.bind(this),
        success: function () {
          this.transitionToRoute('bookmarks');
        }.bind(this)
      });
    }
  }
});
