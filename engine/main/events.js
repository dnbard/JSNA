define([
	'pubsub'
], function(pubsub){
	var eventsList = {
		SCENE_CHANGED: 'Scene was changed', 
		KEYBOARD_KEYPRESS: 'Keyboard key was pressed',
		KEYBOARD_KEYDOWN: 'Keyboard key down',
		KEYBOARD_KEYUP: 'Keyboard key up'
	};

	return {
		subscribe: function(event, handler){
			pubsub.subscribe(event, handler);
		}, 
		publish: function(){
			pubsub.publish.apply(this, arguments);
		}, 
		list: eventsList
	}
});