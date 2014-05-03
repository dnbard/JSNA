define([
	'underscore',
	'mixins/events',
	'mixins/mouseEvents',
	'mixins/unique',
	'gui/baseGui',
	'ext/helpers'
], function(_, eventsMixin, eventsMouseMixin, uniqueMixin, BaseGui, helpers){
	function ButtonText(obj){
		var self = this;

		_.extend(this, eventsMixin);
		_.extend(this, eventsMouseMixin);
		_.extend(this, uniqueMixin);

		obj = typeof obj === 'object'? obj : {};

		self.text = obj.text? obj.text: '';
		self.font = obj.font? obj.font: self.font;
		self.color = obj.color? obj.color: 'yellow';
		self.x = obj.x? obj.x : 0;
		self.y = obj.y? obj.y : 0;

		var baseUpdate = this.__proto__.update.bind(this);
		this.update = function(time){
			if ((this.width == 0 || this.height == 0) && (this.text && this.text.length > 0)){

				var measure = this.measureText(null, this.getDrawObject());
				this.width = measure.width;
				this.height = measure.height;
			}

			this.mouseCheck(time);
		}
	}

	ButtonText.prototype = new BaseGui();
	ButtonText.prototype.draw = function(time, ctx){
		this.fillText(ctx, this.getDrawObject());
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