import Ember from 'ember';

export default Ember.Route.extend({
    ajax: Ember.inject.service(),

    routeController: null,

    setupController: function(controller, model) {
	this._super(controller, model);
	
	Ember.set(this, "routeController", controller);
    },
    
    uploadPhoto: function(file, _this) {
	file.readAsDataURL().then(function (url) {
	    Ember.set(_this, "routeController.uploadedImage", url);
	});

	Ember.set(_this, "routeController.type", "...calculating...");
	Ember.set(_this, "routeController.classifying", true);
	
	let response = file.upload('/upload/');
	response.then(function(r) {
	    var uuid = JSON.parse(r.body[0].data)['data']['id'];
	    
	    Ember.Logger.log(uuid);
	    
	    var theUrl = '/classify/' + uuid;
	    
	    var xmlHttp = new XMLHttpRequest();
	    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
	    xmlHttp.send( null );
	    Ember.set(_this, "routeController.type", xmlHttp.responseText);
	    var res = JSON.parse(xmlHttp.responseText);
	    Ember.Logger.log(res);
	    Ember.set(_this, "routeController.classifying", false);
	    Ember.set(_this, "routeController.label", res.label);
	    Ember.set(_this, "routeController.treshhold", res.classifierTreshhold);
	    Ember.set(_this, "routeController.results", res.results);
	});
    },

  actions: {
      uploadImage(file) {
	  Ember.get(this, 'uploadPhoto')(file, this);
    }
  }

});
