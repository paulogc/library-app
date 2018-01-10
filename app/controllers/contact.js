import Controller from '@ember/controller';
import { empty } from '@ember/object/computed';
import Ember from 'ember';

import { emailRgx } from './index';


export default Controller.extend({

  email: '',
  message: '',

  isValid: Ember.computed.match('email', emailRgx),
  isDisabled: Ember.computed.not('isValid') && empty('message'),

  actions: {
    sendMessage() {
      this.store.createRecord(
        'contact',
        { email: this.get('email'),message: this.get('message')},
      )
      .save()
      .then(() => {
        this.set('responseMessage', 'Thank you for your message,we are going to send feedback as soon as possible');
        this.set('message', '');
        this.set('email', '');
      });
    }    
  }
});
