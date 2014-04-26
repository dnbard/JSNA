require.config({
    baseUrl: 'engine',
    paths: {
        public: '../public',
        underscore: '../bower_components/underscore/underscore',
        pubsub: '../bower_components/pubsub/src/pubsub',
        sprites: '../sprites', 
        ext: '../ext'
    }
});

require([
    'engine', 
    'gui/image', 
    'images', 
    'module/sceneManager', 
    'module/scene',
    'module/fpsCounter'
], function(eng, Image, images, SceneManager, Scene, FpsCounter){
    var game = eng.init();

    //var sceneManager = new SceneManager();
    //game.addComponent(sceneManager);
    var scene = new Scene();
    game.sceneManager
        .add(scene)
        .activate();

    scene.addComponent(new FpsCounter());

    /*game.addComponent(new Image({
        //image: images.get('http://a.deviantart.net/avatars/l/i/lilyas.gif?1', true),
        image: images.get('60467'),
        x: 0,
        layer: 5000
    }));*/
});