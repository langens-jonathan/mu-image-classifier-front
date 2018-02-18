import Ember from 'ember';

export default Ember.Controller.extend({
    uploadedImage: Ember.computed('model.uploadedImage', function() {
	var m = this.get('model');
	Ember.Logger.log("model: " + m);
	if(m !== null) {
	    return m.uploadedImage;
	} else {
	    return "";
	}
    }),

    // init: function() {
    // 	this.get("uploadedImage");
    // }	
});
