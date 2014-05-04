define([    
	'public/global',
	'module/scene', 
	'scenes/mainMenuModel',
    'gui/buttonText',
    'gui/image',
    'images',
    'main/events'
],function(global, Scene, mainMenuModel, ButtonText, Image, ImagesManager, events){
	function MainMenuScene (game){
		this.init(mainMenuModel);

		events.on(events.MM_CHARACTER_SELECTED, function(characterElement){
			//TODO: get character id from element
		});
	}

	MainMenuScene.prototype = new Scene();

	return MainMenuScene;
});