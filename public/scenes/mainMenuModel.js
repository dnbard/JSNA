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
        'selectCharacter':{
            type: ButtonText,
            init:{
                x: 750,
                y: 180,
                text: 'Select character',
                font: '45px Dosis'
            }
        },
        'hero-knight': {
            type: Image,
            init:{
                x: 650,
                y: 250,
                image: ImagesManager.get('hero_knight0'),
                layer: 10,
                opacity: 0.5,
                character: Characters['knight']
            },
            mixins:[
                characterSelectionMixin,
                new AnimationMixin({
                    spriteName: 'hero_knight{0}',
                    startIndex: 0,
                    finishIndex: 3,
                    timeoutBetweenFrames: 210,
                    endless: true
                })
            ]
        },
        'hero-unknown0': {
            type: Image,
            init:{
                x: 750,
                y: 250,
                image: ImagesManager.get('hero_unknown'),
                layer: 10,
                opacity: 0.35
            },          
            mixins:[
                characterSelectionMixin
            ]
        },
        'hero-unknown1': {
            type: Image,
            init:{
                x: 850,
                y: 250,
                image: ImagesManager.get('hero_unknown'),
                layer: 10,
                opacity: 0.35
            }
        },
        'hero-unknown2': {
            type: Image,
            init:{
                x: 950,
                y: 250,
                image: ImagesManager.get('hero_unknown'),
                layer: 10,
                opacity: 0.35
            }
        },
        'hero-unknown3': {
            type: Image,
            init:{
                x: 1050,
                y: 250,
                image: ImagesManager.get('hero_unknown'),
                layer: 10,
                opacity: 0.35
            }
        }
    };
});