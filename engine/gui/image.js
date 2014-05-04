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

        var self = this,
            oldImage = null;

        this.extend(this, eventsMixin);
        this.extend(this, eventsMouseMixin);
        this.extend(this, uniqueMixin);

        var baseDraw = this.__proto__.draw.bind(this);
        this.draw = function(time, ctx){
            baseDraw(time, ctx);
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

        this.update = function(time){
            if (this.image && this.image != oldImage){
                oldImage = this.image;
                calculateImageSize();   
            }
        }

        function calculateImageSize(){
            if (self.image.width == 0 && self.image.height == 0){
                if (self.image.isPartOfSpriteSheet){
                        self.width = self.image.spriteInfo.width;
                        self.height = self.image.spriteInfo.height;
                }

                self.image.onload = function(event){
                    if (self.isPartOfSpriteSheet){
                        self.width = self.spriteInfo.width;
                        self.height = self.spriteInfo.height;
                    } else {
                        self.width = self.image.width;
                        self.height = self.image.height;
                    }
                }
            } else {
                self.width = self.image.width;
                self.height = self.image.height;
            }
        }
    }

    Image.prototype = new BaseGui();
    Image.prototype.manager = Images;

    return Image;
});
