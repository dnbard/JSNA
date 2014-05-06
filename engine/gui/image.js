define([
    'underscore',
    'gui/baseGui',
    'images',
    'mixins/events',
    'mixins/mouseEvents',
    'mixins/unique'
], function(_, BaseGui, Images, eventsMixin, eventsMouseMixin, uniqueMixin){
    function Image (obj){
        this.merge(this, obj);

        this.extend(this, eventsMixin);
        this.extend(this, eventsMouseMixin);
        this.extend(this, uniqueMixin);

        this.draw = function(time, ctx){
            if (this.image != null){
                var drawParams = {
                        x: this.x,
                        y: this.y,
                        opacity: this.opacity,
                        image: this.image
                    };

                if (this.image.isPartOfSpriteSheet) {
                    this.drawSprite(ctx, drawParams)
                } else {
                    this.drawImage(ctx, drawParams);
                }
            }
        }        
    }

    Image.prototype = new BaseGui();
    Image.prototype.manager = Images;
    Image.prototype.update = function(time){
        if (this.image){
            this.calculateImageSize();
        }
    }
    Image.prototype.calculateImageSize = function(){
        if (this.width == 0 && this.height == 0){
            if (this.image.isPartOfSpriteSheet){
                    this.width = this.image.sprite.spriteInfo[this.image.name].width;
                    this.height = this.image.sprite.spriteInfo[this.image.name].height;
            }            
        }
    }

    return Image;
});
