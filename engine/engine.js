define([
    'public/global',
    'module/fpsCounter',
    'public/game',
    'mouse',
    'keyboard',
    'spriteBatch'
], function(global, FpsCounter, Game, Mouse, Keyboard, spriteBatch){
    function getDrawingContext(setDrawingSize){
        try{
            var drawingCanvas = document.getElementById(global.canvasId),
                context = drawingCanvas.getContext('2d'),
                _width = window.innerWidth,
                _height = window.innerHeight;

            if (setDrawingSize){
                drawingCanvas.width = _width;
                drawingCanvas.height = _height;
                global.width = _width;
                global.height = _height;
                global.center = {
                    x: Math.abs(_width * 0.5),
                    y: Math.abs(_height * 0.5)
                }

                context.canvas.width = global.width;
                context.canvas.height = global.height;
        }
            return context;
        } catch(e){
            console.error(e);
            return null;
        }
    }

    return {
        init:  function(){
            var game = new Game(),
                ctx = getDrawingContext(true);

            ctx.canvas.oncontextmenu = function() {
                return false;
            }

            function frameRoutine(){
                var cTime = new Date();

                Mouse.update(cTime);
                game.update(cTime);
                
                spriteBatch.begin(ctx, function(){
                    game.draw(cTime, ctx);
                });
                spriteBatch.finish(ctx);

                requestAnimationFrame(frameRoutine);
            };

            setTimeout(frameRoutine, 0);
            return game;
        }, 
        getDrawingContext: getDrawingContext
    };
});
