import Ember from 'ember';

export default Ember.Controller.extend({
    // init() {
    // 	this.get('store').findAll('class').then(function(result) {
    // 	    Ember.set(this, "classes", result);
    // 	});
    // },

    init: function() {
	return this.get('store').findAll('class').then((function(_this) {
	    return function(result) {
		return _this.set('classes', result);
	    };
	})(this));
    },
    
    classes: [],

    label: "",

    description: "",

    clearForm () {
	this.set('label', '');
	this.set('description', '');
    },


    actions : {
	plusClicked () {
	    Ember.set(this, "showDialog", true);
	},

	closeDialog () {
	    Ember.set(this, "showDialog", false);
	},

	closeTrainDialog() {
	    Ember.set(this, "showTrainDialog", false);
	},

	trainClicked() {
	    Ember.set(this, "showTrainDialog", true);
	},

	startTraining() {
	    var theUrl = '/retrain/';
	    var xmlHttp = new XMLHttpRequest();
	    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
	    xmlHttp.send( null );
	    Ember.Logger.log(xmlHttp.responseText);
	    Ember.set(this, "showTrainDialog", false);
	},

	submitNewClass () {
	    var label = this.get('label');
	    var description = this.get('description');

	    var new_class = this.get('store').createRecord('class', {
		'title': label,
		'description': description
	    });

	    new_class.save();

	    this.get("clearForm")();
	    Ember.set(this, "showDialog", false);

	    this.get('init')();
	}
    }
});
