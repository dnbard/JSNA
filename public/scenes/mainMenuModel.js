define([
	'gui/buttonText',
	'gui/image',
	'public/global', 
	'images'
], function(ButtonText, Image, global, ImagesManager){
	function startGameOnTickMove(){
		if (this.x < 150){
			this.x += 8;
		} else {
			this.removeEvent(startGameOnTickMove);
		}
	}

	function optionsOnTickMove(){
		if (this.x < 110){
			this.x += 8;
		} else {
			this.removeEvent(optionsOnTickMove);
		}
	}

	return {
		'startGameButton': {
			type: ButtonText,
			init: {				
		        text: 'START',
		        font: '45px Dosis',
		        x: -105,
		        y: 350,
		        color: 'white'
			}, 
			events: {
				mousein: function(){ this.color = 'red'; },
				mouseout: function(){ this.color = 'white'; },
				click: function(){ this.color = 'green'; }, 
				tick: startGameOnTickMove
			}
		}, 
		'optionsButton': {
			type: ButtonText, 
			init: {
				text: 'OPTIONS',
		        font: '45px Dosis',
		        x: -145,
		        y: 400,
		        color: 'gray'
			},
			events: {
				tick: optionsOnTickMove
			}
		}, 
		'gameNameText': {
			type: ButtonText,
			init:{
				text: 'Deadbeat Guild',
				x: 250,
				y: 75,
				color: 'white',
				font: '80px Dosis'
			}
		}, 
		'versionText': {
			type: ButtonText,
			init:{
				text: 'version: ' + global.version,
				x: 640,
				y: 165,
				color: 'white',
				font: '14px Dosis'
			}
		},
		'darkCasterImage': {
			type: Image,
			init:{
				x: 50,
				y: 50,
				image: ImagesManager.get('mm_darkcaster'),
				layer: 10
			}
		}, 
		'hero-knight': {
			type: Image,
			init:{
				x: 750,
				y: 100,
				image: ImagesManager.get('hero_knight'),
				layer: 10
			}
		}
	};
});