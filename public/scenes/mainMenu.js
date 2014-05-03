define([    
	'public/global',
	'module/scene',    
    'gui/buttonText',
    'gui/image',
    'images'
],function(global, Scene, ButtonText, Image, ImagesManager){
	function MainMenuScene (game){
		var startGameButton = new ButtonText({
	        text: 'START',
	        font: '45px Dosis',
	        x: -105,
	        y: 350,
	        color: 'white'
    	});

    	var optionsButton = new ButtonText({
	        text: 'OPTIONS',
	        font: '45px Dosis',
	        x: -145,
	        y: 400,
	        color: 'lightgray'
    	});

		startGameButton.addEvent('mousein', function(){
			this.color = 'red';
		});

		startGameButton.addEvent('mouseout', function(){
			this.color = 'white';
		});

		startGameButton.addEvent('click', function(){
			this.color = 'green';
		});

		var interval = setInterval(function(){
			startGameButton.x += 2;
			optionsButton.x += 2;

			if (startGameButton.x > 150){
				clearInterval(interval);
			}
		}, 4);

		this.add(startGameButton);
		this.add(optionsButton);

		var darkCasterImage = new Image({
			x: 50,
			y: 50,
			image: ImagesManager.get('mm_darkcaster'),
			layer: 10
		});

		this.add(darkCasterImage);

		var gameNameText = new ButtonText({
			text: 'Game Name here',
			x: 250,
			y: 75,
			color: 'white',
			font: '80px Dosis'
		});

		this.add(gameNameText);

		var versionText = new ButtonText({
			text: 'version: ' + global.version,
			x: 700,
			y: 165,
			color: 'white',
			font: '14px Dosis'
		});

		this.add(versionText);
	}

	MainMenuScene.prototype = new Scene();

	return MainMenuScene;
});