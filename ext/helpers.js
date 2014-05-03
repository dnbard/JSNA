define([], function(){
	var s4 = function() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
	};

	return {
		guid: function(){
        	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        	s4() + '-' + s4() + s4() + s4();
    	}, 
        format: function(format){
            var args = Array.prototype.slice.call(arguments, 1);
            var sprintfRegex = /\{(\d+)\}/g;

            var sprintf = function (match, number) {
                return number in args ? args[number] : match;
            };

            return format.replace(sprintfRegex, sprintf);
        }
	};
})