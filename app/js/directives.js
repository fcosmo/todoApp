'use strict';

/* Directives */
		
var directives = {};

	

directives.fieldvaluedirective = function () {
	  return {
		    restrict: 'E',
		    transclude: false,
		    replace: true,
		    scope: {
		    	fieldvalue: "="
		    },
	        template: '<span>{{fieldvalue}}</span>',
		    link: function (scope, element, attrs) {
		    	
		    }
		  };
};
	
	

app.directive(directives);