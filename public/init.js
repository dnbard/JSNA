require.config({
    baseUrl: 'engine',
    paths: {
        public: '../public'
    }
});

require(['engine', 'gui/image', 'images'], function(eng, Image, images){
    var game = eng.init();

    game.addComponent(new Image({
        image: images.get('http://a.deviantart.net/avatars/l/i/lilyas.gif?1'),
        x: 0,
        layer: 5000
    }));
});