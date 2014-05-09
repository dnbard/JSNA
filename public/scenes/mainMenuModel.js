define([
    'gui/buttonText',
    'gui/image',
    'mixins/animation',
    'module/fpsCounter',
    'public/global',
    'mixins/characterSelection',
    'images',
    'base/characters',
    'main/events'
], function(ButtonText, Image, AnimationMixin, FpsCounter, global, characterSelectionMixin, ImagesManager, Characters, events){
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
        'fps': {
            type: FpsCounter
        },
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
                click: function(){ 
                    this.color = 'green';
                    events.trigger(events.MM_START);
                },
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
                text: 'SpaceEx',
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
                x: 450,
                y: 165,
                color: 'white',
                font: '14px Dosis'
            }
        }
    };
});