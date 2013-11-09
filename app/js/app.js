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

		if (typeof input === "undefined") {
			return [];
		}
	    var out = [];

		var fieldMetas = metas[selectedMetaName].fieldMeta;		  
	    
	    	// this uses the natural order from the meta.json ! very important
		for (var fieldMeta in fieldMetas) {
			if (fieldMetas[fieldMeta].classMeta === "$id") {
				continue;
			}
	    	out.push(input[fieldMeta]);
		}
			     	    
	    return out;
	  }
});



app.filter('fieldValueList', function() {
	  return function(input, metas, selectedMetaName) {

			if (typeof input == "undefined") {
				return [];
			}		  
		  
		var fieldMetas = metas[selectedMetaName].fieldMeta;		  
	    var out = [];
	    
    		// this uses the natural order from the meta.json ! very important	    
		for (var fieldMeta in fieldMetas) {
			if (fieldMetas[fieldMeta].classMeta === "$id") {
				continue;
			}		
	    	//out.push({"key":fieldMeta,"value":input[fieldMeta]});
	    	out.push(fieldMeta + "^" + input[fieldMeta]);
	    	//out.push([fieldMeta, input[fieldMeta]]);
			
		}
			     	    
	    return out;
	  }
});