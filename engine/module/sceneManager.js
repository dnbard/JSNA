define([
	'ext/helpers', 
	'main/events'
], function(helpers, events){
	function SceneManager(){
		this.scenes = {};
		this.activeScene = null;
	}

	var lastAddedScene;

	SceneManager.prototype = {
		add: function(scene){
			var id = scene.name ? scene.name : helpers.guid();			
			this.scenes[id] = scene;
			scene.name = id;
			lastAddedScene = scene;
			return this;			
		},
		remove: function(arg){
			var id = typeof arg == 'string' ? arg : arg.name,			
				scene = this.scenes[id];
			
			if (scene) this.scenes[id] = null;

			return this;
		}, 
		activate: function(arg){
			var id, scene;

			if (!arg && lastAddedScene) {
				scene = lastAddedScene 
			} else {
				id = typeof arg == 'string' ? arg : arg.name;
				scene = this.scenes[id];
			}		

			if (scene) {
				this.activeScene = scene;
				events.publish(events.list.SCENE_CHANGED, scene);
			}
		},
		update: function(time){
			if(this.activeScene)
				this.activeScene.update(time);
		},
		draw: function(time,ctx){
			if(this.activeScene)
				this.activeScene.draw(time, ctx);
		}
	};

	return SceneManager;
});