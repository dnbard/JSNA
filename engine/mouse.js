define(['public/global'], function(global){
    var instance = null,
        drawingCanvas = document.getElementById(global.canvasId);

    function Mouse(){
        if(instance !== null){
            throw new Error("Cannot instantiate more than one MouseSingleton");
        }

        this.offset = { x: 0, y: 0 };
        this.position = { x: 0, y: 0 };

        this.isMouseMove = false;

        this.isLeftButtonPressed = false;
        this.isMiddleButtonPressed = false;
        this.isRightButtonPressed = false;

        this.initialize();
    }

    Mouse.prototype = {
        initialize: function(){
            try{
                drawingCanvas.onmousemove = function(e){
                    instance.offset.x = e.offsetX - instance.position.x;
                    instance.offset.y = e.offsetY - instance.position.y;

                    instance.position.x = e.offsetX;
                    instance.position.y = e.offsetY;
                };
                drawingCanvas.onmouseout = drawingCanvas.onmousemove;

                drawingCanvas.onmousedown = function(e){
                    this.isLeftButtonPressed = e.which == 1;
                    this.isMiddleButtonPressed = e.which == 2;
                    this.isRightButtonPressed = e.which == 3;
                }

                drawingCanvas.onmouseup = function(e){
                    if (e.which == 1) this.isLeftButtonPressed = false;
                    else if (e.which == 2) this.isMiddleButtonPressed = false;
                    else if (e.which == 3) this.isRightButtonPressed = false;
                }
            } catch (e){
                console.error(e);
            }
        },

        update: function(time){
            instance.isMouseMove = instance.offset.x != 0 || instance.offset.y != 0;
        }
    };

    Mouse.getInstance = function(){
        if(instance === null){
            instance = new Mouse();
        }
        return instance;
    };

    return Mouse.getInstance();
});
