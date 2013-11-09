'use strict';

/* Directives */
		
var directives = {};

directives.superman = function () {
	  return {
		    restrict: 'E',
		    transclude: false,
		    replace: true,
	        template: '<span>partials/superman.html</span>',
		    scope: {
		    	
		    },
		    
		    link: function (scope, element, attrs) {
		    }
		  };
};
	

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