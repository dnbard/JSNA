define(['gui/baseGui'], function(BaseGui){
    function Image (obj){
        this.merge(this, obj);

        var self = this,
            oldImage = null;

        var baseDraw = this.__proto__.draw.bind(this);
        this.draw = function(time, ctx){
            baseDraw(time, ctx);
            if (this.image != null){
                this.drawImage(ctx, {
                    x: this.x,
                    y: this.y,
                    image: this.image
                });
            }

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
                if (this.image.width == 0 && this.image.height == 0){
                    this.image.onload = function(event){
                        self.width = self.image.width;
                        self.height = self.image.height;
                    }
                } else {
                    this.width = this.image.width;
                    this.height = this.image.height;
                }
            }

            baseUpdate(time);
        }
    }

    Image.prototype = new BaseGui();
    return Image;
});
