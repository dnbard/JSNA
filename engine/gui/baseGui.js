define([
    'module/baseComponent',
    'sugar'
], function(baseComponent){
    function BaseGui(){
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;

        this.font = 'bold 17px Arial';
    }

    BaseGui.prototype = baseComponent;

    return BaseGui;
});