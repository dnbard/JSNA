define([
	'gui/buttonText',
	'gui/image',
	'public/global', 
	'images'
], function(ButtonText, Image, global, ImagesManager){
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
			events:{
				'mousein': function(){ this.color = 'red'; },
				'mouseout': function(){ this.color = 'white'; },
				'click': function(){ this.color = 'green'; }
			}
		}, 
		'optionsButton': {
			type: ButtonText, 
			init:{
				text: 'OPTIONS',
		        font: '45px Dosis',
		        x: -145,
		        y: 400,
		        color: 'gray'
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
		}
	};
});