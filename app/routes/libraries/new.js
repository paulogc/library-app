import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return this.store.createRecord('library');
  },

  actions: {

    saveLibrary(newLibrary) {
      if (newLibrary.get('name') && newLibrary.get('address') && newLibrary.get('phone')) {
        this.controller.set('emptyField', false);
        this.controller.set('alertMessage', '');
        newLibrary.save().then(() => this.transitionTo('libraries'));
      } else {
        this.controller.set('emptyField', true);
        this.controller.set('alertMessage', 'Please fill al the fields to save');
      }
    },

    willTransition() {
      // rollbackAttributes() removes the record from the store
      // if the model 'isNew'
      this.controller.get('model').rollbackAttributes();
    }
  }
});
