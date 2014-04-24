define([
	'pubsub'
], function(pubsub){
	var eventsList = {
		SCENE_CHANGED: 'Scene was changed'
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