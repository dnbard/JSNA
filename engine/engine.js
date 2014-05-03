define(['public/global', 'module/fpsCounter', 'public/game', 'mouse', 'keyboard'], function(global, FpsCounter, Game, Mouse, Keyboard){

    function getDrawingContext(setDrawingSize){
        try{
            var drawingCanvas = document.getElementById(global.canvasId),
                context = drawingCanvas.getContext('2d'), 
                body = document.body,
                html = document.documentElement,
                _width = html.scrollWidth,                
                _height = Math.max( body.scrollHeight, body.offsetHeight, 
                    html.clientHeight, html.scrollHeight, html.offsetHeight);

            /*if (setDrawingSize){
                drawingCanvas.width = _width;            
                drawingCanvas.height = _height;
                global.width = _width;
                global.height = _height;
            }*/

            drawingCanvas.width = global.width;            
            drawingCanvas.height = global.height;

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
                ctx = getDrawingContext(true);

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
        }, 
        getDrawingContext: getDrawingContext
    };
});
