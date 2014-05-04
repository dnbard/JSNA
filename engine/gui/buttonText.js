define([
	'underscore',
	'mixins/events',
	'mixins/mouseEvents',
	'mixins/unique',
	'gui/baseGui',
	'ext/helpers'
], function(_, eventsMixin, eventsMouseMixin, uniqueMixin, BaseGui, helpers){
	function ButtonText(obj){
		this.extend(this, eventsMixin);
		this.extend(this, eventsMouseMixin);
		this.extend(this, uniqueMixin);

		obj = typeof obj === 'object'? obj : {};

		this.text = obj.text? obj.text: '';
		this.font = obj.font? obj.font: this.font;
		this.color = obj.color? obj.color: 'yellow';
		this.x = obj.x? obj.x : 0;
		this.y = obj.y? obj.y : 0;		
	}

	ButtonText.prototype = new BaseGui();
	ButtonText.prototype.draw = function(time, ctx){
		this.fillText(ctx, this.getDrawObject());
	}
	ButtonText.prototype.update = function(time){
		if ((this.width == 0 || this.height == 0) && (this.text && this.text.length > 0)){

			var measure = this.measureText(null, this.getDrawObject());
			this.width = measure.width;
			this.height = measure.height;
		}
	}
	ButtonText.prototype.getDrawObject = function(){
		return {
            text: this.text,
            x: this.x,
            y: this.y,
            font: this.font,
            color: this.color
        };
	}	

	return ButtonText;
});