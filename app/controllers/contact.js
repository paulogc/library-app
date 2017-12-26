import Controller from '@ember/controller';
import Ember from 'ember';

import { emailRgx } from './index';


export default Controller.extend({

  email: '',
  message: '',

  isValid: Ember.computed.match('email', emailRgx),
  isDisabled: Ember.computed.not('isValid') && Ember.computed.empty('message'),

  actions: {
    sendMessage() {
      this.store.createRecord(
        'contact',
        { email: this.get('email'),message: this.get('message')},
      );

      this.set('responseMessage', 'Thank you for your message,we are going to send feedback as soon as possible');
        this.set('email', '');
        this.set('message', '');
    }    
  }
});
