define(['public/global'], function(global){
        return function(){
            var components = [],
                componentsSort = function(a,b){
                    try{
                        return a.layer - b.layer;
                    } catch(e){
                        return 0;
                    }
                };

            this.addComponent = function(component){
                components.push(component);
                components.sort(componentsSort);
            }

            this.removeComponent = function(component){
                var type = typeof(component);

                if (type == 'object'){
                    var index = components.indexOf(component);
                    if (index >= 0){
                        components.splice(index, 1);
                    }
                } else if (type == 'string'){
                    for(var i in components){
                        var element = components[i];
                        if (element.name == component){
                            components.splice(i, 1);
                            break;
                        }
                    }
                }
            }

            this.update = function(time){
                for(var i in components){
                    var component = components[i];
                    if (component.update)
                        component.update(time);
                }
            }

            this.draw = function(time, ctx){
                setDefaultStyles(ctx);
                ctx.fillRect(0, 0, global.width, global.height);

                for(var i in components){
                    var component = components[i];
                    if (component.draw)
                        component.draw(time, ctx);
                }
            }

            function setDefaultStyles(ctx){
                ctx.fillStyle = "#000";
            }
        }
    }
);
