define({
    fillText: function(ctx, options){
        if (options.font){
            defaultFont = ctx.font;
            ctx.font = options.font;
        }

        if (options.color) {
            defaultColor = ctx.fillStyle;
            ctx.fillStyle = options.color;
        }

        ctx.fillText(options.text,
            options.x? options.x: 0,
            options.y? options.y: 0
        );

        if (options.color) {
            ctx.fillStyle = defaultColor;
        }

        if (options.font) {
            ctx.font = defaultFont;
        }
    },
    drawImage: function(ctx, options){
        ctx.drawImage(options.image,
            options.x? options.x: 0,
            options.y? options.y: 0);
    }
})
