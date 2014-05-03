define([
	'mouse'
], function(mouse){
	return {
		mouseHover: false,
        mouseIn: false,
        mouseCheck: function(time){
        	this.mouseHover = this.isPointInRect({
                x: mouse.position.x,
                y: mouse.position.y
            }, {
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height
            });

            if (this.mouseHover){
                if (!this.mouseIn){
                    this.mouseIn = true;
                    this.raiseEvent('mousein');
                }
                this.raiseEvent('mousehover');

                if (mouse.isClick){
                    this.raiseEvent('click', {
                        mouse: mouse,
                        button: mouse.isClick
                    });
                }

            } else {
                if (this.mouseIn){
                    this.raiseEvent('mouseout');
                }
                this.mouseIn = false;
            }
        }
	}
});