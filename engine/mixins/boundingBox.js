define([], function(){
	return {
		draw: function(time, ctx){
			var defaultStrokeStyle = ctx.strokeStyle;
			ctx.strokeStyle = 'cyan';

			ctx.rect(this.x, this.y, this.width, this.height);			
			ctx.stroke();
			
			ctx.strokeStyle = defaultStrokeStyle;
		}
	};
});