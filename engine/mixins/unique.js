define([
	'ext/helpers'
], function(helpers){
	return {
		getId: function() {
	        if (!this.hashCode) {
	            this.hashCode = helpers.guid();
	        }
	        return this.hashCode;
	    }
	}
})