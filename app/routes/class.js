import Ember from 'ember';

export default Ember.Route.extend({
    queryParams: {
	uuid: {
	    refreshModel: true
	}
    },

    trax: [],

    model(params) {
	var modelPromise, uuid;
	uuid = Ember.get(params, "uuid");
	modelPromise = this.get('store').findRecord('class', uuid);
	modelPromise.then((function(_this) {
	    return function(result) {
		return result.get("trainingExamples").then(function(exs) {
		    Ember.run.later( function () {
			_this.set("controller.trax", exs.map(function(e) {
			    return {
				"id": e.get("id"),
				"file": e.get("file")
			    };
			}));
		    });
		});
	    };
	})(this));

	return modelPromise;
    },
    
    // model(params) {
    // 	var uuid = Ember.get(params, 'uuid');
    // 	var modelPromise = this.get('store').findRecord('class', uuid);
    // 	modelPromise.then(function(result) {
    // 	    result.get("trainingExamples").then(function(exs) {
    // 		Ember.Logger.log(exs);
    // 		this.set("trax", exs);
    // 	    });
    // 	});
    	// modelPromise.then((function(_this) {
	//     return function(result) {
	// 	Ember.Logger.log(result);
    	// 	result.get('trainingExamples').then((function(__this) {
	// 	    return function(examples) {
	//     		Ember.Logger.log(examples)
	// 	    })(_this));
	// 					   })(this));
    	// return modelPromise;

	
    // 	return modelPromise;
    // },

    setupController(controller, model) {
	this._super(controller, model);

	Ember.set(this, "controller", controller);
	Ember.set(controller, "currentModel", model);
    },

    ajax: Ember.inject.service(),

    uploadPhoto: function(file, _this) {
	file.readAsDataURL().then(function (url) {
	    Ember.set(_this, "controller.uploadedImage", url);
	});

	let response = file.upload('/upload/');
	response.then(function(r) {
	    var uuid = JSON.parse(r.body[0].data)['data']['id'];
	    
	    Ember.Logger.log(uuid);
	    
	    var currentClass = _this.get("controller.currentModel.id");
	    
	    var theUrl = '/add-training-example/' + currentClass + '/' + uuid;

	    Ember.Logger.log("calling url: " + theUrl);
	    
	    var xmlHttp = new XMLHttpRequest();
	    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
	    xmlHttp.send( null );
	    Ember.set(_this, "controller.type", xmlHttp.responseText);
	});
    },

  actions: {
      uploadImage(file) {
	  Ember.get(this, 'uploadPhoto')(file, this);
    }
  }

});
