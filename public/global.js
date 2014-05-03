define([], function(){
	return {
	    canvasId: 'working_canvas',
	    fps: 60,
	    isDebug: true,
	    height: 760,
	    maxDelay: function(){
	        return 1000 / this.fps;
	    },
	    width: 1200, 
	    spritesFolder: 'sprites/', 
	    version: '0.0.1'
	}
});