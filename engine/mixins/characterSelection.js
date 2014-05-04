define([
	'main/events'
], function(events){
	var selected = null;

	events.on(events.MM_CHARACTER_SELECTED, function(element){
		selected = element.getId();
	});

	return {
		update: function(){
			if (this.mouseHover) return;
			this.opacity = this.getId() == selected? 1 : 0.5;
		}, 
		events: {
			click: function(event){
				events.trigger(events.MM_CHARACTER_SELECTED, event.target); 
			},
			mousein: function(){ this.opacity = 1; },
			mouseout: function(){ this.opacity = 0.5; }
		}, 
		draw: function(time, ctx){
			if (this.getId() == selected){
				var defaultStrokeStyle = ctx.strokeStyle;
				ctx.strokeStyle = 'cyan';				
				ctx.strokeRect(this.x, this.y, this.width, this.height);
				ctx.strokeStyle = defaultStrokeStyle;
			}
		}
	}
});