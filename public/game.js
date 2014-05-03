define([
    'public/global', 
    'module/sceneManager'
], function(global, SceneManager){
    return function(){
        this.sceneManager = new SceneManager();

        this.update = function(time){
            this.sceneManager.update(time);
        }

        this.draw = function(time, ctx){
            this.sceneManager.draw(time, ctx);
        }
    }
});
