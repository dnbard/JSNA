define([
    'main/events',
    'mouse',
    'main/strings'
], function(events, mouse, strings){
    function Camera(){
        this.offsetX = 0;
        this.offsetY = 0;

        this.update = function(){
            if (mouse.isRightButtonPressed){
                this.offsetX = mouse.offset.x;
                this.offsetY = mouse.offset.y;

            } else {
                this.offsetX = 0;
                this.offsetY = 0;
            }
        }
    }

    return Camera;
});