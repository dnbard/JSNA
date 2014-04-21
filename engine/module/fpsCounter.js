define([
    'module/baseComponent', 
    'public/global', 
    'images', 
    'sprites/sprites-wrapper', 
    'underscore'
],
    function(baseComponent, global, images, spritesWrapper, _){
        function FpsCounter(){            
            maxDelay = global.maxDelay(),
            lastSecond = 0,
            fpsValue = 0,
            counter = 0;

            this.x = 5;
            this.y = 20;
            this.layer = 99999;

            this.font = 'bold 17px Arial';                                    

            this.update = function(time){
                counter ++;
                if (lastSecond != time.getSeconds()){
                    this.tick();
                    fpsValue = counter;
                    counter = 0;
                    lastSecond = time.getSeconds();
                }
            }
        }

        FpsCounter.prototype = _.extend({            
            tick: function(){

            },
            draw: function(time, ctx){
                this.fillText(ctx, {
                    text: fpsValue,
                    x: this.x,
                    y: this.y,
                    font: this.font,
                    color: 'yellow'
                });
            }
        }, baseComponent);
        
        return FpsCounter;
    }
);
