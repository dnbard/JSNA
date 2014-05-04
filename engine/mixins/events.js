define([
	'underscore',
	'sugar'
], function(_){
	return {
		_events: {},
		addEvent: function(type, handler){
			var id = this.getId()+'';
			if (!this._events[id]){
				this._events[id] = [];
			}
	        
	        this._events[id].push({
	            type: type,
	            handler: handler
	        });
    	}, 

    	raiseEvent: function(type, args){
    		var id = this.getId()+'';
    		if (!this._events[id]){
    			return false;
    		}

	        for(var i in this._events[id]){
	            var event = this._events[id][i];
	            if (event.type == type){
	                _.bind(event.handler, this)(args);
	            }
	        }
	    },

	    removeEvent: function(event){
	    	var id = this.getId()+'', 
	    		eventsContex = this._events[id];

	    	if (typeof event == 'object'){
	    		this._events[event] = null;
	    	} else if (typeof event == 'function'){
	    		if (eventsContex){
	    			eventsContex.remove(function(el){
	    				return el.handler == event;
	    			});
	    		} else {
	    			_.each(this._events, function(value, key){
	    				var eventsContex = value;
	    				eventsContex.remove(function(el){
	    					return el.handler == event;
	    				});
	    			});
	    		}
	    	}

	        var query = typeof event == 'string'? 'type' : 'handler';        
	        
	        /*this._events.remove(function(el){
	            return el[query] == event;
	        });*/
	    }, 

	    update: function(time){
	    	this.raiseEvent('tick');
	    }
	};
});