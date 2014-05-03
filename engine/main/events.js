define([
	'pubsub',
	'underscore'
], function(pubsub, _){
	var eventsList = {
		SCENE_CHANGED: 'Scene was changed', 
		KEYBOARD_KEYPRESS: 'Keyboard key was pressed',
		KEYBOARD_KEYDOWN: 'Keyboard key down',
		KEYBOARD_KEYUP: 'Keyboard key up'
	};

	var events = {
		subscribe: function(event, handler){
			pubsub.subscribe(event, handler);
		}, 
		publish: function(){
			pubsub.publish.apply(this, arguments);
		}, 
		list: eventsList
	}

	return _.extend(events, eventsList);
});