'use strict';

/* Directives */
		
var directives = {};

directives.superman = function () {
	  return {
		    restrict: 'E',
		    transclude: false,
		    replace: true,
	        templateUrl: 'partials/superman.html',
		    scope: {
		    	
		    },
		    
		    link: function (scope, element, attrs) {
		    }
		  };
};
	
	

app.directive(directives);