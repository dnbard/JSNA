define([
	'gui/baseGui'
], function(BaseGui){
	function ButtonText(obj){
		var self = this;

		obj = typeof obj === 'object'? obj : {};

		self.text = obj.text? obj.text: '';
		self.font = obj.font? obj.font: self.font;
		self.color = obj.color? obj.color: 'yellow';
		self.x = obj.x? obj.x : 0;
		self.y = obj.y? obj.y : 0;

		self.addEvent('mousein', function(){
			self.color = 'red';
		});

		self.addEvent('mouseout', function(){
			self.color = 'yellow';
		});

		var baseUpdate = self.__proto__.update.bind(self);
		self.update = function(time){
			if ((self.width == 0 || self.height == 0) && (self.text && self.text.length > 0)){

				var measure = this.measureText(null, this.getDrawObject());
				self.width = measure.width;
				self.height = measure.height;
			}

			baseUpdate(time);
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