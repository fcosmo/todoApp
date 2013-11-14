


"use strict";

var metas = {
		
		"BaseObject" : {
			"classMeta": {
				"name":"BaseObject",
				"label":"Base Object"
			},
			
			"fieldMetas": [
				{	
					"name":"id",
					"label":"Id",
					"classMeta":"$string"
				}
			]
		},
		
		
		"ComponentDeployment":{
			"classMeta":{
				"name":"ComponentDeployment",
				"label":"Component Deployment",
				"extend":"BaseObject"
			},
			"fieldMetas":[
				{	
					"name":"title",
					"label":"Title",
					"classMeta":"$string"
				},
				{
					"name":"unit",
					"label":"Unit",
					"classMeta":"Unit"
				},
				{
					"name":"subSystem",
					"label":"Sub System",
					"classMeta":"SubSystem"
				}
			]

		},    

		"Dimension":{
			"classMeta":{
				"name":"Dimension",
				"label":"Dimension"
			},
			"fieldMetas":[			             
				{
					"name":"title",
					"label":"Title",
					"classMeta":"$string"
				},
				{
					"name":"quantity",
					"label":"Quantity",
					"classMeta":"Quantity"
				},
				{
					"name":"physicalQuantity",
					"label":"Physical Quantity",
					"classMeta":"PhysicalQuantity",
					"list":true                
				}
			]
		}   
};	



(function () {
	
	var classes = {
			
	};

	
	for (var key in metas) {
		
		var aMeta = metas[key];	 
	
		classes[aMeta.classMeta.name]  = (function (aMeta) {
			
				// define the base field properties
			var properties =  {			
					classMeta: {	
						get: function () {
							return aMeta.classMeta;
						}
					},

					fieldMeta: {
						get: function () {
							return aMeta.fieldMetas;
						}					
					}								
			};		
				
			
				// works the inheritance tree and get all the meta fields 
			var metaFields = [];									
			var extendsClass = metas[aMeta.classMeta.extend];
			while (typeof extendsClass !== "undefined") {
				metaFields = metaFields.concat(extendsClass.fieldMetas);	
				extendsClass = extendsClass.classMeta.extend;
			}			
			metaFields = metaFields.concat(aMeta.fieldMetas);
			
			
				// create the field metas
			for (var i = 0; i < metaFields.length; i++) {
				var aFieldMeta = metaFields[i]; 
				properties[aFieldMeta.name] = {
					writable : true,
					value : undefined
					// later
				}
			}	
			
			
				// define the actual class
			var newClass = function (data) {
				
				Object.defineProperties(this, properties);				
				if (data) {
					for (var i = 0; i < metaFields.length; i++) {
						var aFieldMeta = metaFields[i]; 					
						this[aFieldMeta.name] = data[aFieldMeta.name];	
						var a = this[aFieldMeta.name];
						console.log(a);
					}	
				}
			}
			
		
			
			return newClass;
			
		})(aMeta);
					
						
	}
	
	
	var anDataEntry = {
		"id":"4Srfu8ZWiZIhewee4DfqhZVHfzI",
		"title":"7",
		"unit":"CSEScAitl0SVrMCXesOE5e0sYRW",
		"subsystem":"DWBS03NqFB6ax3Oqz3zspNvTeLX"
	};
	
	var aComponentDeployment = new classes.ComponentDeployment(anDataEntry);
	

	aComponentDeployment.getLi
	
	var aDimension = new classes.Dimension();
	alert(aDimension.classMeta.label);	
	
/*	
	
	var __hasProp = {}.hasOwnProperty;
	var __extends = function(child, parent) {
		for ( var key in parent) {
			if (__hasProp.call(parent, key))
				child[key] = parent[key];
		}
		function ctor() {
			this.constructor = child;
		}
		ctor.prototype = parent.prototype;
		child.prototype = new ctor();
		child.__super__ = parent.prototype;
		return child;
	};	

	
	
	var BaseObject = (function () {
		
		function BaseObject () {
			Object.defineProperties(this, {
				id: {	
					get : function () {
						return "something";
					}
				}
			});			
		}
		
		BaseObject.prototype.extend = function () {
			
			__extends (aFn, this.prototype);
		
			 function aFn() {
				 var _ref = aFn.__super__.constructor.apply(this, arguments);
				 return _ref;
			 }

			return aFn;		
			
		}
	
		
		return BaseObject;
		
	})();
	
	var Animal = (function() {
		  function Animal(name) {
				Object.defineProperties(this, {
					name: {	
						value : name
					}
				});		
		  }

		  Animal.prototype.move = function(meters) {
		    return alert(this.name + (" moved " + meters + "m."));
		  };
		  
		  Animal.prototype.extend = function () {
			  __extends (aFn, this.prototype);
				
			  function aFn() {
				  var _ref = aFn.__super__.constructor.apply(this, arguments);
				  return _ref;
			  }

			  return aFn;		
		  }		  

		  return Animal;

		})();
	
	var testAnimal = new Animal("some animal");
	
	var Dog = Animal.extend();
	
	testAnimal.move(5);
	aDog = new Dog(4);
	
	//subclass extends superclass
	//SomeSubClass.prototype = Object.create(BaseObject.prototype);		
	//SomeSubClass.prototype.constructor = SomeSubClass;				
	//var aSomeSubClass = BaseObject.extend();
	//alert(aSomeSubClass.id);
	
	
	

	
	
	'use strict';
	
	var a = 4;
	var b = 5;
	

	
	function Dog(name, age) {
		Object.defineProperties(this, {
		    name: {
		        value: name,
		        enumerable: true
		    },
		    age: {
		        set: function (value) {
		            value = parseInt(value, 10);
		            if (isNaN(value)) throw new Error("Value set on age is not a number");
		            age = value;
		        },
		        get: function () {
		            return age;
		        },
		        enumerable: true
		    }
		});
	}
	
	
	var someDog = new Dog("somename", 24);
	*/
	
	
})()