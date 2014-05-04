define([
    'underscore',
    'engine-js',    
    'ext/helpers',
    'sugar'
], function(_, engine, helpers){
    var defaultFont, defaultColor,
        prepare = function(ctx, options){
        ctx.textBaseline="top";

        if (options.font){
            defaultFont = ctx.font;
            ctx.font = options.font;
        }

        if (options.color) {
            defaultColor = ctx.fillStyle;
            ctx.fillStyle = options.color;
        }

        if (options.opacity){
            ctx.globalAlpha = options.opacity;
        }
    }, restore = function(ctx){
        ctx.fillStyle = defaultColor;
        ctx.font = defaultFont;
        ctx.globalAlpha = 1;
    }, getTextHeight = function(font) {
        var body = document.getElementsByTagName('body')[0],
            dummy = document.createElement('div'),
            dummyText = document.createTextNode('M'),
            fontStyle = convertFontToCssStyle(font);
        
        dummy.appendChild(dummyText);        
        dummy.setAttribute('style', fontStyle);
        body.appendChild(dummy);
        var result = dummy.offsetHeight;
        body.removeChild(dummy);
        return result;
    }, findAndRemove = function(array, f){
        var element = array.find(f);
        if (element) {
            array.remove(f);
            return true;  
        } 
        return false;
    }, convertFontToCssStyle = function(font){
        var styles = font.words();

        try{
            var size = styles.find(/[0-9]*p?/);
            styles.remove(size);

            var isBold = findAndRemove(styles, 'bold'), 
                isItalic = findAndRemove(styles, 'italic'), 
                family = styles[0];

            var style = helpers.format('font-family: {0}; font-size: {1};', family, size);
            if (isBold){
                style += 'font-weight: bold';
            }
            if (isItalic){
                style += 'font-style: italic';
            }

            return style;

        } catch (e){
            console.error(e);
            console.log('Unhandled font to CSS style conversion: ' + font);
        }
    }

    return {
        measureText: function(ctx, options){
            ctx = ctx? ctx : engine.getDrawingContext();

            prepare(ctx, options);

            var metrics = ctx.measureText(options.text);
            metrics.height = getTextHeight(options.font);
            restore(ctx);
            return metrics;
        },
        fillText: function(ctx, options){            
            prepare(ctx, options);            

            ctx.fillText(options.text,
                options.x? options.x: 0,
                options.y? options.y: 0
            );

            restore(ctx);
        },
        drawImage: function(ctx, options){
            prepare(ctx, options);

            ctx.drawImage(options.image,
                options.x? options.x: 0,
                options.y? options.y: 0);

            restore(ctx);
        },
        drawSprite: function(ctx, options){
            prepare(ctx, options);
            var spriteInfo = options.image.sprite.spriteInfo[options.image.name];

            ctx.drawImage(options.image.sprite,
                spriteInfo.x, 
                spriteInfo.y,
                spriteInfo.width, 
                spriteInfo.height,
                options.x? options.x: 0,
                options.y? options.y: 0,
                spriteInfo.width,
                spriteInfo.height);

            restore(ctx);
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
        }, 
        extend: function(context, mixin){
            if (mixin.update){
                var mixinUpdate = _.bind(mixin.update, context);
                context.update = _.wrap(context.update, function(func, time){
                    func.bind(context)(time);
                    mixinUpdate(time);                    
                });
            }

            if (mixin.draw){
                var mixinDraw = _.bind(mixin.draw, context);
                context.draw = _.wrap(context.draw, function(func, time, ctx){
                    mixinDraw(time, ctx);
                    func.bind(context)(time, ctx);
                });
            }

            if (mixin.events){                
                _.each(mixin.events, _.bind(function(value, key){
                    this.addEvent(key, value);
                }, this));
            }            

            _.extend(context, _.omit(mixin, 'update', 'draw', 'events'));
        }
    }
});