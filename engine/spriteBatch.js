define([
    'underscore',
    'PriorityQueue'
], function(_, PriorityQueue){
    var instance = new SpriteBatch();

    function SpriteBatch(){
        this.queue = new PriorityQueue({
            comparator: function(a, b){
                if (!a.layer) return 1; 
                if (!b.layer) return -1;

                return b.layer - a.layer;
            },
            strategy: PriorityQueue.BinaryHeapStrategy
        });
    }

    SpriteBatch.prototype.begin = function(){

    }

    SpriteBatch.prototype.finish = function(){
        var queueLength = this.queue.length;

        while(queueLength > 0){
            var action = this.queue.dequeue();
            action.handler(action.ctx, action.options);

            queueLength --;
        }
    }

    var addToBatch = _.bind(function(ctx, options, handler){
        this.queue.queue({
            handler: handler,
            layer: options.layer,
            options: options,
            ctx: ctx
        });
    }, instance);

    var _fillText = _.bind(function(ctx, options){
        this.prepare(ctx, options);

        ctx.fillText(options.text,
            options.x? options.x: 0,
            options.y? options.y: 0
        );

        this.restore(ctx);
    }, instance);

    SpriteBatch.prototype.fillText = function(ctx, options){
        addToBatch(ctx, options, _fillText);
    }

    var _drawImage = _.bind(function(ctx, options){
        this.prepare(ctx, options);

        ctx.drawImage(options.image,
            options.x? options.x: 0,
            options.y? options.y: 0);

        this.restore(ctx);
    }, instance);

    SpriteBatch.prototype.drawImage = function(ctx, options){
        addToBatch(ctx, options, _drawImage);
    }

    var _drawSprite = _.bind(function(ctx, options){
        this.prepare(ctx, options);
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

        this.restore(ctx);
    }, instance);

    SpriteBatch.prototype.drawSprite = function(ctx, options){
        addToBatch(ctx, options, _drawSprite);
    }

    SpriteBatch.prototype.prepare = function(ctx, options){
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
    }

    SpriteBatch.prototype.restore = function(ctx){
        ctx.fillStyle = defaultColor;
        ctx.font = defaultFont;
        ctx.globalAlpha = 1;
    }

    return instance;
});