define(['gui/baseGui'], function(BaseGui){
    function Image (obj){
        this.merge(this, obj);

        var self = this,
            oldImage = null;

        var baseDraw = this.__proto__.draw.bind(this);
        this.draw = function(time, ctx){
            baseDraw(time, ctx);
            if (this.image != null){
                var drawParams = {
                        x: this.x,
                        y: this.y,
                        image: this.image
                    };

                if (this.image.isPartOfSpriteSheet) {
                    this.drawSprite(ctx, drawParams)
                } else {
                    this.drawImage(ctx, drawParams);
                }
            }

            //DEBUG
            this.fillText(ctx, {
                text: this.mouseHover,
                x: 0,
                y: 150,
                font: this.font,
                color: 'yellow'
            });
        }

        var baseUpdate = this.__proto__.update.bind(this);
        this.update = function(time){
            if (this.image && this.image != oldImage){
                oldImage = this.image;
                calculateImageSize();   
            }

            baseUpdate(time);
        }

        function calculateImageSize(){
            if (self.image.width == 0 && self.image.height == 0){
                if (self.image.isPartOfSpriteSheet){
                        self.width = self.image.spriteInfo.width;
                        self.height = self.image.spriteInfo.height;
                }

                this.image.onload = function(event){
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
    return Image;
});
