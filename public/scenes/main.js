define([
    'module/scene',
    'gui/image',
    'images',
    'mixins/camera', 
    'module/camera',
    'module/fpsCounter'
], function(Scene, Image, images, cameraMixin, Camera, FpsCounter){
    function MainScene(game){
        this.camera = new Camera();
        this.add(this.camera);

        var test = new Image({
            image: images.get('hero_knight0'),
            camera: this.camera
        });
        test.extend(cameraMixin);
        this.add(test);

        this.add(new FpsCounter());
    }

    MainScene.prototype = new Scene();

    return MainScene;
});