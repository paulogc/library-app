import Controller from '@ember/controller';
import Ember from 'ember';

export const emailRgx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default Controller.extend({
  emailAddress: '',
  emailExistes: false,

  isValid: Ember.computed.match('emailAddress', emailRgx),
  isDisabled: Ember.computed.not('isValid'),

  actions: {
    saveInvitation() {
      const email = this.get('emailAddress');
      this.get('store').findAll('invitation').then(invitation => {
        const filtered = invitation.filterBy('email', email);
        if (filtered.length > 0) {
          this.set('emailExistes', true);
          this.set('responseMessage', 'This email is already being used! Choose a different one');
        } else {
          const newInvitation = this.store.createRecord('invitation', { email });
          newInvitation.save().then(() => {
            this.set('emailExistes', false);
            this.set('emailAddress', '');
            this.set('responseMessage', 'Thank you! We saved your email address');
          });
        }
      });
    }
  }
});
