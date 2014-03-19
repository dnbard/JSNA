define(['module/baseComponent', 'public/global', 'images'],
    function(baseComponent, global, images){
        function FpsCounter(){
            var counter = 0,
                maxDelay = global.maxDelay(),
                lastSecond = 0,
                fpsValue = 0;

            this.x = 5;
            this.y = 20;

            this.font = 'bold 17px Arial';

            this.update = function(time){
                counter ++;
                if (lastSecond != time.getSeconds()){
                    this.tick();
                    fpsValue = counter;
                    counter = 0;
                    lastSecond = time.getSeconds();
                }
            };

            this.tick = function(){
                /*if(global.isDebug)
                    console.log(lastSecond + 's: ' + counter);*/
            }

            this.draw = function(time, ctx){
                this.fillText(ctx, {
                    text: fpsValue,
                    x: this.x,
                    y: this.y,
                    font: this.font,
                    color: 'yellow'
                });

                this.drawImage(ctx, {
                    x: 50 + i,
                    y: 60,
                    image: images.get('http://naxel.github.com/src/articles/habr/canvas-text/simple.png')
                });
            }
        }

        FpsCounter.prototype = baseComponent;
        return FpsCounter;
    }
);
