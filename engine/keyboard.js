define([
	'public/global', 
	'main/events'
], function(global, events){
	var instance = null;

	function KeyboardController(){
		var self = this;

		window.addEventListener('keypress', function(event){
			events.publish(events.KEYBOARD_KEYPRESS, self.getKeyPressObject(event));
		});

		window.addEventListener('keydown', function(event){
			events.publish(events.KEYBOARD_KEYDOWN, self.getKeyPressObject(event));
		});

		window.addEventListener('keyup', function(event){
			events.publish(events.KEYBOARD_KEYUP, self.getKeyPressObject(event));
		});
	}

	KeyboardController.getInstance = function(){
		if (instance === null){
			instance = new KeyboardController();
		}
		return instance;
	}

	KeyboardController.prototype.getKeyPressObject = function(event){
		return {
			alt: event.altKey,
			keyCode: event.keyCode? event.keyCode : event.charCode,
			key: String.fromCharCode(event.keyCode? event.keyCode : event.charCode),
			ctrl: event.ctrlKey,
			shift: event.shiftKey
		};
	}

	return KeyboardController.getInstance();
});