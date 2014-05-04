define([
    'underscore', 
    'public/global'
], function(_, global){
	function SceneComponent(){
		this.components = [];
	}

	function componentsSort (a,b){
        try{
            return a.layer - b.layer;
        } catch(e){
            return 0;
        }
    }

    function setDefaultStyles(ctx){
        ctx.fillStyle = "#000";
    }

	SceneComponent.prototype = {		
		add: function(component){			
            this.components.push(component);
            this.components.sort(componentsSort);
            return this;     
		},
		remove: function(component){
            var type = typeof component;

            if (type == 'object'){
                var index = components.indexOf(component);
                if (index >= 0){
                    this.components.splice(index, 1);
                }
            } else if (type == 'string'){
                for(var i = 0; i< this.components.length; i++){
                    var element = this.components[i];
                    if (element.name == component){
                        this.components.splice(i, 1);
                        break;
                    }
                }
            }
        },
        update: function(time){
            for(var i = 0; i< this.components.length; i++){
                var component = this.components[i];
                if (component.update)
                    component.update(time);
            }
        }, 
        draw: function(time, ctx){
            setDefaultStyles(ctx);
            ctx.fillRect(0, 0, global.width, global.height);

            for(var i in this.components){
                var component = this.components[i];
                if (component.draw)
                    component.draw(time, ctx);
            }
        }, 
        init: function(model){
            if (_.isObject(model)){
                _.each(model, function(value, key){
                    var args = value.init? value.init : {},
                        element = new value.type(args);

                    if (value.events){
                        _.each(value.events, function(value, key){
                            element.addEvent(key, value);
                        });
                    }

                    if (value.mixins){
                        _.each(value.mixins, function(mixin){
                            element.extend(element, mixin);
                        });
                    }

                    this.add(element);
                    this[key] = element;
                }, this);
            }
        }
	};

	return SceneComponent;
});