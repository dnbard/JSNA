define([], function(){
    return {
        update: function(){
            if (!this.camera){
                return;
            }

            this.x += this.camera.offsetX * 8;
            this.y += this.camera.offsetY * 8;
        }
    }
});