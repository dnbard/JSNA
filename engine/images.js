define(function(){
    var instance = null,
        images = [];

    function Images(){
        if(instance !== null){
            throw new Error("Cannot instantiate more than one MySingleton, use MySingleton.getInstance()");
        }

        this.initialize();
    }

    Images.prototype = {
        initialize: function(){
            this.foo = 0;
            this.bar = 1;
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
