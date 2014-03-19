define({
    canvasId: 'working_canvas',
    fps: 60,
    isDebug: true,
    height: 600,
    maxDelay: function(){
        return 1000 / this.fps;
    },
    width: 900
});
