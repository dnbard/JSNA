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
    },
    isPointInRect: function(point, rect){
        try{
            return (point.x >= rect.x && point.y >= rect.y &&
                point.x <= rect.x + rect.width &&
                point.y <= rect.y + rect.height);
        } catch (e){
            return false;
        }
    },
    merge: function(obj1, obj2){
        if (!obj2) return;
        for (var attrname in obj2) {
            obj1[attrname] = obj2[attrname];
        }
    }
})
