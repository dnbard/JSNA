define(function(){
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
            this.get = function(imageName){
                var image = images[imageName];
                if (!image){
                    image = new Image();
                    image.src = imageName;
                    images[imageName] = image;
                }
                return image;
            }
        }
    };

    Images.getInstance = function(){
        if(instance === null){
            instance = new Images();
        }
        return instance;
    };

    return Images.getInstance();
});
