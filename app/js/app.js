'use strict';

/* App Module */

var app = angular.module('falkonryTercel', []);


app.filter('objToList', function() {
  return function(input) {
    var out = []; 
    for(var i in input){
      out.push(input[i]);
    }
    return out;
  }
});


app.filter('fieldMetaList', function() {
	  return function(input, metas, selectedMetaName) {

		var fieldMetas = metas[selectedMetaName].fieldMeta;		  
	    var out = [];

		for (var fieldMeta in fieldMetas) {
	    	out.push(input[fieldMeta]);
		}
			     	    
	    return out;
	  }
});



app.filter('fieldValueList', function() {
	  return function(input, metas, selectedMetaName) {

		var fieldMetas = metas[selectedMetaName].fieldMeta;		  
	    var out = [];

		for (var fieldMeta in fieldMetas) {
	    	out.push(input[fieldMeta]);
		}
			     	    
	    return out;
	  }
});