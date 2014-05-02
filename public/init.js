require.config({
    baseUrl: 'engine',
    paths: {
        public: '../public',
        underscore: '../bower_components/underscore/underscore',
        pubsub: '../bower_components/pubsub/src/pubsub',
        sprites: '../sprites', 
        ext: '../ext',
        'engine-js': '../engine/engine'
    }
});

require([
    'engine', 
    'gui/image', 
    'images', 
    'module/sceneManager', 
    'module/scene',
    'module/fpsCounter',
    'gui/buttonText'
], function(eng, Image, images, SceneManager, Scene, FpsCounter, ButtonText){
    var game = eng.init();

    var scene = new Scene();
    game.sceneManager
        .add(scene)
        .activate();

    scene.add(new FpsCounter());
    scene.add(new ButtonText({
        text: 'A game without a name', 
        x: 75,
        y: 150,
        color: 'white'
    }));
});