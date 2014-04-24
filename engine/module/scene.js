define(['underscore'], function(_){
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
		addComponent: function(component){			
            components.push(this.component);
            components.sort(componentsSort);        
		},
		removeComponent: function(component){
            var type = typeof(this.component);

            if (type == 'object'){
                var index = components.indexOf(component);
                if (index >= 0){
                    this.components.splice(index, 1);
                }
            } else if (type == 'string'){
                for(var i in this.components){
                    var element = this.components[i];
                    if (element.name == component){
                        this.components.splice(i, 1);
                        break;
                    }
                }
            }
        },
        update: function(time){
            for(var i in this.components){
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
        }
	};

	return SceneComponent;
});