define([], function(){
	return {
		draw: function(time, ctx){
			ctx.rect(this.x, this.y, this.width, this.height);
			ctx.strokeStyle = 'cyan';
			ctx.stroke();
			ctx.strokeStyle= 'black';
		}
	};
});