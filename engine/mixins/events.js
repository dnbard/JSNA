define([
	'underscore',
	'sugar'
], function(_){
	return {
		events: {},
		addEvent: function(type, handler){
			var id = this.getId()+'';
			if (!this.events[id]){
				this.events[id] = [];
			}
	        
	        this.events[id].push({
	            type: type,
	            handler: handler
	        });
    	}, 

    	raiseEvent: function(type, args){
    		var id = this.getId()+'';
    		if (!this.events[id]){
    			return false;
    		}

	        for(var i in this.events[id]){
	            var event = this.events[id][i];
	            if (event.type == type){
	                _.bind(event.handler, this)(args);
	            }
	        }
	    },

	    removeEvent: function(event){
	    	var id = this.getId()+'', 
	    		eventsContex = this.events[id];

	    	if (typeof event == 'object'){
	    		this.events[event] = null;
	    	} else if (typeof event == 'function'){
	    		if (eventsContex){
	    			eventsContex.remove(function(el){
	    				return el.handler == event;
	    			});
	    		} else {
	    			_.each(this.events, function(value, key){
	    				var eventsContex = value;
	    				eventsContex.remove(function(el){
	    					return el.handler == event;
	    				});
	    			});
	    		}
	    	}

	        var query = typeof event == 'string'? 'type' : 'handler';        
	        
	        /*this.events.remove(function(el){
	            return el[query] == event;
	        });*/
	    }, 

	    update: function(time){
	    	this.raiseEvent('tick');
	    }
	};
});