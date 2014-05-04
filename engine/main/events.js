define([
	'pubsub',
	'underscore'
], function(pubsub, _){
	var eventsList = {
		SCENE_CHANGED: 'Scene was changed', 
		
		KEYBOARD_KEYPRESS: 'Keyboard key was pressed',
		KEYBOARD_KEYDOWN: 'Keyboard key down',
		KEYBOARD_KEYUP: 'Keyboard key up',

		MM_CHARACTER_SELECTED: 'Character selected on main menu'
	};

	function publish(){
		pubsub.publish.apply(this, arguments);
	}

	function subscribe(event, handler){
		pubsub.subscribe(event, handler);
	}

	var events = {
		subscribe: subscribe, 
		trigger: publish,
		publish: publish, 
		on: subscribe,
		list: eventsList
	}

	return _.extend(events, eventsList);
});