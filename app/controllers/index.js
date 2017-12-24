import Controller from '@ember/controller';

export default Controller.extend({
  isDisabled: true,

  actions: {
    toggleButton() {
      this.toggleProperty('isDisabled');
    }
  }
});
