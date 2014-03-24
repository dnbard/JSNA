define(['public/global', 'module/fpsCounter', 'public/game', 'mouse'], function(global, FpsCounter, Game, Mouse){

    function getDrawingContext(){
        try{
            var drawingCanvas = document.getElementById(global.canvasId),
                context = drawingCanvas.getContext('2d');

            return context;
        } catch(e){
            console.error(e);
            return null;
        }
    }

    return {
        init:  function(){
            var maxDelay = global.maxDelay(),
                fpsCounter = new FpsCounter(),
                game = new Game(),
                lastFrameMilliseconds = -999,
                ctx = getDrawingContext();

            game.addComponent(fpsCounter);

            setInterval(function(){
                var cTime = new Date(),
                    milliseconds = cTime.getMilliseconds(),
                    delay = milliseconds - lastFrameMilliseconds;

                if ((delay < 0? -delay: delay) < maxDelay) return;
                lastFrameMilliseconds = milliseconds;

                Mouse.update(cTime);

                game.update(cTime);
                game.draw(cTime, ctx);
            }, 0);

            return game;
        }
    };
});
