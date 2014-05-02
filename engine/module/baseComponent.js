define([
    'engine-js'
], function(engine){
    var defaultFont, defaultColor,
        textPrepare = function(ctx, options){
        ctx.textBaseline="top";

        if (options.font){
            defaultFont = ctx.font;
            ctx.font = options.font;
        }

        if (options.color) {
            defaultColor = ctx.fillStyle;
            ctx.fillStyle = options.color;
        }
    }, textRestore = function(ctx){
        ctx.fillStyle = defaultColor;
        ctx.font = defaultFont;        
    }, getTextHeight = function(fontStyle) {
        var body = document.getElementsByTagName("body")[0];
        var dummy = document.createElement("div");
        var dummyText = document.createTextNode("M");
        dummy.appendChild(dummyText);
        dummy.setAttribute("style", fontStyle);
        body.appendChild(dummy);
        var result = dummy.offsetHeight;
        body.removeChild(dummy);
        return result;
    }

    return {
        measureText: function(ctx, options){
            ctx = ctx? ctx : engine.getDrawingContext();

            textPrepare(ctx, options);

            var metrics = ctx.measureText(options.text);
            metrics.height = getTextHeight(options.font);
            textRestore(ctx);
            return metrics;
        },
        fillText: function(ctx, options){            
            textPrepare(ctx, options);            

            ctx.fillText(options.text,
                options.x? options.x: 0,
                options.y? options.y: 0
            );

            textRestore(ctx);
        },
        drawImage: function(ctx, options){
            ctx.drawImage(options.image,
                options.x? options.x: 0,
                options.y? options.y: 0);
        },
        drawSprite: function(ctx, options){
            var spriteInfo = options.image.spriteInfo;

            ctx.drawImage(options.image,
                spriteInfo.offset_x, 
                spriteInfo.offset_y,
                spriteInfo.width, 
                spriteInfo.height,
                options.x? options.x: 0,
                options.y? options.y: 0,
                spriteInfo.width,
                spriteInfo.height);
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
    }
});