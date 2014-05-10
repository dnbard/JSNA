define([
    'public/global', 
    'main/events'
], function(global, events){
    var instance = null;

    function KeyboardController(){
        var self = this,
            keyTimeDelay = 300;

        var keypressTimeout = 0;
        window.addEventListener('keypress', function(event){
            var cDate = new Date();
            
            if (cDate - keypressTimeout > keyTimeDelay){
                events.publish(events.KEYBOARD_KEYPRESS, self.getKeyPressObject(event));
                keypressTimeout = cDate;
            }
        });

        var keydownTimeout = 0;
        window.addEventListener('keydown', function(event){
            var cDate = new Date();

            if (cDate - keydownTimeout > keyTimeDelay){
                events.publish(events.KEYBOARD_KEYDOWN, self.getKeyPressObject(event));
                keydownTimeout = cDate;
            }
        });

        var keyupTimeout = 0;
        window.addEventListener('keyup', function(event){
            var cDate = new Date();

            if (cDate - keyupTimeout > keyTimeDelay){
                events.publish(events.KEYBOARD_KEYUP, self.getKeyPressObject(event));
                keydownTimeout = cDate;
            }
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