define([
    'public/global',
    'underscore'
], function(global, _){
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

        this.isClick = null;

        this.initialize();
    }

    var clickHolder = 0;

    Mouse.prototype = {
        clickHandler : function (e){
            e = e || {which: null};

            if (!this.isLeftButtonPressed && e.which == 1){
                clickHolder = 1;
                this.isClick = 'left';                
            } else if (!this.isMiddleButtonPressed && e.which == 2){
                clickHolder = 1;
                this.isClick = 'middle';
            } else if (!this.isRightButtonPressed && e.which == 3){
                clickHolder = 1;
                this.isClick = 'right';
            } else if (clickHolder == 0) {
                this.isClick = null;
                clickHolder --;
            } else {
                clickHolder --;
            }
        },
        initialize: function(){            
            drawingCanvas.onmousemove = _.bind(function(e){
                instance.offset.x = e.offsetX - instance.position.x;
                instance.offset.y = e.offsetY - instance.position.y;

                instance.position.x = e.offsetX;
                instance.position.y = e.offsetY;
            }, this);
            drawingCanvas.onmouseout = drawingCanvas.onmousemove;

            drawingCanvas.onmousedown = _.bind(function(e){
                this.clickHandler(e);

                this.isLeftButtonPressed = e.which == 1;
                this.isMiddleButtonPressed = e.which == 2;
                this.isRightButtonPressed = e.which == 3;                    
            }, this);

            drawingCanvas.onmouseup = _.bind(function(e){
                if (e.which == 1) this.isLeftButtonPressed = false;
                else if (e.which == 2) this.isMiddleButtonPressed = false;
                else if (e.which == 3) this.isRightButtonPressed = false;                    
            }, this);
        },

        update: function(time){
            if (clickHolder >= 0) {
                this.clickHandler();
            }
            
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
