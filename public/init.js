require.config({
    baseUrl: 'engine',
    paths: {
        public: '../public',
        underscore: '../bower_components/underscore/underscore',
        pubsub: '../bower_components/pubsub/src/pubsub',
        sprites: '../sprites', 
        ext: '../ext',
        'engine-js': '../engine/engine',
        scenes: '../public/scenes', 
        sugar: '../ext/sugar.min',
        base: '../public/base'
    }
});

require([
    'engine',
    'scenes/mainMenu'
], function(eng, MainMenuScene){
    var game = eng.init();

    var menuScene = new MainMenuScene(game);
    game.sceneManager
        .add(menuScene)
        .activate();
});