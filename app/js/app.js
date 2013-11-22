'use strict';

/* Core */




/* App Module */

var app = angular.module('falkonryTercel', []);

$(function () {
	
	$.ajax({
		  url: "/meta/meta.json"
		}).done(function(content) {
			
        	core.metaService(content);	
        	console.log("worked");					
	});	
})


