define([    
	'public/global',
	'module/scene', 
	'scenes/mainMenuModel',
    'gui/buttonText',
    'gui/image',
    'images'
],function(global, Scene, mainMenuModel, ButtonText, Image, ImagesManager){
	function MainMenuScene (game){
		this.init(mainMenuModel);

		var interval = setInterval(_.bind(function(){
			this.startGameButton.x += 2;
			this.optionsButton.x += 2;

			if (this.startGameButton.x > 150){
				clearInterval(interval);
			}
		}, this), 4);
	}

	MainMenuScene.prototype = new Scene();

	return MainMenuScene;
});