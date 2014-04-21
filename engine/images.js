define([
    'sprites/sprites-wrapper',
    'public/global'
],function(spritesWrapper, global){
    var instance = null,
        images = [];

    function Images(){
        if(instance !== null){
            throw new Error("Cannot instantiate more than one ImageSingleton");
        }

        this.initialize();
    }

    Images.prototype = {
        initialize: function(){
            this.get = function(imageName, doRequest){
                if (doRequest){
                    return getImageFromIndividualRequest(imageName);                    
                } else {
                    return getImageFromSpriteSheet(imageName);
                }
            }
        }
    };

    Images.getInstance = function(){
        if(instance === null){
            instance = new Images();
        }
        return instance;
    };

    function getImageFromIndividualRequest(imageName){
        var image = images[imageName];
        if (!image){
            image = new Image();
            image.src = imageName;
            images[imageName] = image;
        }
        return image;
    }

    function getImageFromSpriteSheet(imageName){
        var sprite = spritesWrapper[imageName];

        if (!sprite) {
            console.error('Cannot find ' + imageName + ' image');
            return null;
        } else {
            var spritePath = global.spritesFolder + sprite.image,
            image = getImageFromIndividualRequest(spritePath);
            
            if (!image){
                image = new Image();
                image.src = imageName;
                images[imageName] = image;
            } 

            image.isPartOfSpriteSheet = true;
            image.spriteInfo = sprite;
            return image;
        }       
    }

    return Images.getInstance();
});
