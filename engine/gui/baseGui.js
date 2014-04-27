define(['module/baseComponent', 'mouse'], function(baseComponent, mouse){
    function BaseGui(){
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;

        this.events = [];

        this.mouseHover = false;
        var mouseIn = false;

        this.font = 'bold 17px Arial';

        this.update = function(time){
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
                if (!mouseIn){
                    mouseIn = true;
                    this.raiseEvent('mousein');
                }
                this.raiseEvent('mousehover');
            } else {
                if (mouseIn){
                    this.raiseEvent('mouseout');
                }
                mouseIn = false;
            }
        }

        this.draw = function(time, ctx){

        }

        this.addEvent = function(type, handler){
            this.events.push({
                type: type,
                handler: handler
            });
        }

        this.raiseEvent = function(type, args){
            for(var i in this.events){
                var event = this.events[i];
                if (event.type == type){
                    event.handler(args);
                }
            }
        }
    }

    BaseGui.prototype = baseComponent;
    return BaseGui;
})
