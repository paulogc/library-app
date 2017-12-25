import Controller from '@ember/controller';
import Ember from 'ember';

import { emailRgx } from './index';


export default Controller.extend({
  emailAddress: '',
  message: '',

  isValid: Ember.computed.match('emailAddress', emailRgx),
  isDisabled: Ember.computed.not('isValid') && Ember.computed.empty('message'),

  actions: {
    sendMessage() {
      alert('Sending your message');
      this.set('responseMessage', 'Thank you for your message,we are going to send feedback as soon as possible');
      this.set('emailAddress', '');
    }
  }
});
