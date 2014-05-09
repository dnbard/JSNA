define([
    'public/global',
    'module/scene', 
    'scenes/mainMenuModel',
    'gui/buttonText',
    'gui/image',
    'images',
    'main/events',
    'main/alerts',
    'scenes/main'
],function(global, Scene, mainMenuModel, ButtonText, Image, ImagesManager, events, alerts, MainScene){
    function MainMenuScene (game){
        this.init(mainMenuModel);

        events.on(events.MM_CHARACTER_SELECTED, function(characterElement){
            model.selectedCharacter = characterElement.character;
        });

        events.on(events.MM_START, _.bind(function(){
            game.sceneManager.remove(this)
                .add(new MainScene(game))
                .activate();
        }, this));
    }

    MainMenuScene.prototype = new Scene();

    return MainMenuScene;
});