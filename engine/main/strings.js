define([], function(){
    return {
        format: function(format){
            var args = Array.prototype.slice.call(arguments, 1);
            var sprintfRegex = /\{(\d+)\}/g;
 
            var sprintf = function (match, number) {
                return number in args ? args[number] : match;
            };
 
            return format.replace(sprintfRegex, sprintf);
        }
    }
})