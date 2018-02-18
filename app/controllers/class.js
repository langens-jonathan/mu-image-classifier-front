import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
	updateClass () {
	    var currentModel = Ember.get(this, "currentModel");
	    currentModel.save();
	}
    }
});
