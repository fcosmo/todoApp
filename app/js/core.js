"use strict";

var classes = {};

classes.Base = Backbone.RelationalModel.extend({
	
	isRelation : function (field) {
		var aRelation = this._relations[field];
		
		if (typeof aRelation === "undefined" || aRelation === null) {
			return false;
		}
		
		var test = aRelation instanceof Backbone.Relation;
		return test;	
	},
	
	typeOf : function (field) {
			
		if (field === "id") {
			return "Id";
		}			
		
		var aRelation = this._relations[field];
			
		if (typeof aRelation === "undefined" || aRelation === null) {
			return "Value";
		}		
			
		if (aRelation instanceof Backbone.HasMany) {
			return "HasMany";
		}
		
		if (aRelation instanceof Backbone.HasOne) {
			return "HasOne";
		}
				
		return "Null"
		
	},
	
	fieldNames : function () {
		
			// XXX jwang - do this when create meta - cache it!
		var meta = this.meta();
		var fieldMetas = meta.fieldMetas;
		
		fieldMetas = _.reject(fieldMetas, function (aFieldMeta) {
			return aFieldMeta.visible == false;
		});		
		
		fieldMetas = _.sortBy(fieldMetas, function (aFieldMeta) {
			return aFieldMeta.rank;
		});
					
		var fieldNames = _.pluck(fieldMetas, "name");
		
		return fieldNames;		
	},
	
	labelForFieldMeta : function (fieldName){		
		var meta = this.meta();
		return meta.fieldMetaMap[fieldName].type.entityMeta.label;
	}	
	
})


var controllers = {};

controllers.NavBarCtrl = function () {
	this.home= function(){
		alert("home");
	};
};



controllers.SideBarCtrl = function (tercelServiceProviderPromise, $q, $scope) {
	
		// move this later
	$scope.switchOnFieldType = function (metas, selectedMetaName, fieldMetaValue) {
		
		var fieldMetaValueArray = fieldMetaValue.split('^');
		
		var fieldMetaKey = fieldMetaValueArray[0];
		
		var fieldMetas = metas[selectedMetaName].fieldMeta;
		
		var fieldMeta = fieldMetas[fieldMetaKey];
	
		return fieldMeta.entityMeta;
	}
	
	
	$scope.resolveEntityField = function (metas, selectedMetaName, fieldMetaValue) {

		var fieldMetaValueArray = fieldMetaValue.split('^');
		
		
		var fieldMetaKey = fieldMetaValueArray[0];
		
		var fieldMetas = metas[selectedMetaName].fieldMeta;
		
		var fieldMeta = fieldMetas[fieldMetaKey];
	
			 
		 
		 
		var fieldMetaValue =  fieldMetaValueArray[1];
		var models =  $scope.models[fieldMeta.entityMeta];
		

		if (fieldMeta.list) {
			var fieldMetaValueList = fieldMetaValue.split(',');
			return "[ " + fieldMetaValueList.length + " " + $scope.metas[fieldMeta.entityMeta].entityMeta.label + "s ]" ;
		}
		else {
			var entry = _.findWhere(models, {"id": fieldMetaValue});	
			var display = entry == null 
			? "INVALID" 
			: typeof entry.title === "undefined"
				? "something else"
				: entry.title;
		
			return display;		
		}
			
	}
	
	$scope.clickField = function (model) {
		var id = model.attributes.id;
		
		$scope.selectedMetaName = fieldMeta.entityMeta;		
		
		alert(id);
	}
	
	$scope.clickList = function (collection) {
		alert(collection.length);
	}	
	
	
	$scope.clickEntity = function (metas, selectedMetaName, fieldMetaValue) {
		var fieldMetaValueArray = fieldMetaValue.split('^');
		
		
		var fieldMetaKey = fieldMetaValueArray[0];
		
		var fieldMetas = metas[selectedMetaName].fieldMeta;
		
		var fieldMeta = fieldMetas[fieldMetaKey];
	
			 
		 
		 
		var fieldMetaValue =  fieldMetaValueArray[1];
		var models =  $scope.models[fieldMeta.entityMeta];
		
		
		var selectedModelList = [];
			
			var allModels = $scope.models[fieldMeta.entityMeta];
			var fieldMetaValueList = fieldMetaValue.split(',');
			for (var i = 0; i < fieldMetaValueList.length; i++) {
				var id = fieldMetaValueList[i];
				var entry = _.findWhere(allModels, {"id": id});	
				selectedModelList.push(entry);
				
			}

		
		$scope.selectedModels = selectedModelList;
		$scope.selectedMetaName = fieldMeta.entityMeta;		
			
	
	}
	
	$scope.selectedMeta = function () {
		
		if (typeof $scope.selectedMetaName == "undefined") {
			return "";
		}
		
		return $scope.metas[$scope.selectedMetaName];
	}
	
	
	$scope.selectedClass = function () {
		
		if (typeof $scope.selectedMetaName === "undefined") {
			return "";
		}
		var scope = $scope;
		var theClass = $scope['classes'][$scope.selectedMetaName];
		var meta = theClass.meta();
		return meta;
	}
		
	
	
	$scope.selectedModel = function () {
		var selectedModels = $scope.selectedModels;
		return selectedModels;
	}	
	
		// the model holders;
	$scope.selectedModels = null;
	
	/*
	  $scope.templates =
		    [ { name: 'template1.html', url: '/partials/template1.html'}
		    , { name: 'template2.html', url: '/partials/template2.html'} ];
		  $scope.template = $scope.templates[0];	
		  */
	
	this.selectMeta = function (metaName) {
		$scope.models = $scope.models || {};
		
		if ($scope.models[metaName]) {
			$scope.selectedMetaName = metaName;	
			$scope.selectedModels = $scope.models[metaName];
			return;
		}
		
		
		var fetchDataPromise = tercelServiceProviderPromise.getJSON("/data/" + metaName + ".json");
		fetchDataPromise.then(function (data) {
			for (var key in data) {
				$scope.models[key] = data[key];
			}	
			$scope.selectedMetaName = metaName;			
			$scope.selectedModels = $scope.models[metaName];			
		}, function () { alert('unable to download')});	
			
	}	
	
	
	this.showSelectedMasterView = function () {	
		
		return '/app/partials/detailView.html';
	}
	
	
	this.createMeta = function () {
		
	}
	
	
	
	this.loadMeta = function (){
		//game.getJSON();
	
		$q.all([
		        tercelServiceProviderPromise.getJSON("/meta/core.json"),		        
		        tercelServiceProviderPromise.getJSON("/meta/componentDeployment.json"),
		        tercelServiceProviderPromise.getJSON("/meta/dimension.json"),
		        tercelServiceProviderPromise.getJSON("/meta/fleet.json"),
		        tercelServiceProviderPromise.getJSON("/meta/fleetEquipment.json"),
		        tercelServiceProviderPromise.getJSON("/meta/parameter.json"),
		        tercelServiceProviderPromise.getJSON("/meta/physicalQuantity.json"),
		        tercelServiceProviderPromise.getJSON("/meta/sensorDeployment.json"),
		        tercelServiceProviderPromise.getJSON("/meta/subsystem.json"),
		        tercelServiceProviderPromise.getJSON("/meta/system.json"),
		        tercelServiceProviderPromise.getJSON("/meta/unit.json"),
		        tercelServiceProviderPromise.getJSON("/meta/parameterInteraction.json")		     
		]).then(
			function (data) {
				var metas = {};

					// for each meta file parse
				for (var i = 0; i < data.length; i++) {
					
						// parse file that contains array of metas
					if (data[i] instanceof Array) {
						for (var j = 0; j < data[i].length; j++) {
							var metaObject = data[i][j];
							var metaName = metaObject.entityMeta.name;																
							metas[metaName] = metaObject;							
						}
					}
					else {
						// parse file that contains just one meta
						var metaObject = data[i];
						var metaName = metaObject.entityMeta.name;																
						metas[metaName] = metaObject;						
					}												
				}			
				
					
					// for each meta, resolve fieldMeta inheritance from superclass, 
					// ie. push fieldMetas to subclasses
				for (metaName in metas) {
					var inheritedFields = [];									
					var extendsClass = metas[metaName].entityMeta.inherits;
						// note. this is doing from bottom to top, should probably do top to bottom using stack
					while (typeof extendsClass !== "undefined") {						
						inheritedFields = inheritedFields.concat(metas[extendsClass].fieldMetas);	
						extendsClass = metas[extendsClass].entityMeta.inherits;
					}			
					metas[metaName].fieldMetas = metas[metaName].fieldMetas.concat(inheritedFields);												
				}
				
					
					// resolve fieldMeta's class to their actual class, also create an convenience fieldMeta map by name
				for (metaName in metas) {
					if (metaName.charAt(0) == '$') {
						continue;
					}
					var fieldMetas = metas[metaName].fieldMetas;
					metas[metaName].fieldMetaMap = {};
					for (var i = 0; i < fieldMetas.length; i++) {
						var fieldMeta = fieldMetas[i];
						var fieldMetaClass = fieldMeta.type;
						
							// since fieldMeta share same reference to the class, so if it hasn't be converted (i.e. still a string) then do conversion
						if (typeof fieldMetaClass === "string") {						
							
								// note. for primitive we should create new instance, with different parameter value, for now one global
							if (fieldMetaClass.charAt(0) == '$') {
								fieldMetaClass = fieldMetaClass.split('(')[0];
								fieldMetas[i].type = metas[fieldMetaClass];							
							}
							else {
								// else it's regular class, point to same global value
								fieldMetas[i].type = metas[fieldMetaClass];														
							}
						}		
						
						metas[metaName].fieldMetaMap[fieldMeta.name] = fieldMeta;
					}
					
				}
				
				
				
				
				// generate backbone relation models
				for (var metaName in metas) {									
					
					var meta = metas[metaName];
					
					if (meta.entityMeta['abstract']) {
						continue;
					}					
					
					classes[meta.entityMeta.name] = (function (meta) {
						
							// define defaults
						var defaults = {};
						for (var i = 0; i < meta.fieldMetas.length; i++) {							
							var fieldMeta = meta.fieldMetas[i];				
							defaults[fieldMeta.name] = fieldMeta["default"];							
						}						
						
							// define relations
						var relations = [];
						for (var i = 0; i < meta.fieldMetas.length; i++) {
							
							var fieldMeta = meta.fieldMetas[i];
							
							if (!fieldMeta.type.entityMeta['abstract']) {
								var aRelation = {
									type: fieldMeta.hasMany ? Backbone.HasMany : Backbone.HasOne,
									key: fieldMeta.name,
									relatedModel : 'classes.' + fieldMeta.type.entityMeta.name
								}
								
								relations.push(aRelation);
							}
						}
						
						var relationalModel = classes.Base.extend({"relations":relations,"defaults":defaults});
						
							// make both class and instance to have method meta
						relationalModel.prototype.meta = function () {
							return meta;
						};
						relationalModel.meta = function () {
							return meta;
						}
						return relationalModel;
						
						
					}) (meta);
					
					
					
				}

				
				$scope.metas = metas;
				$scope.classes = classes;
				
				
				console.log('done metas');
				
			},
			function (error) {
				alert('error !');
			}
		);				
    };		
		
	
    
    function cap(string)
    {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    
	this.loadData= function (){
		//game.getJSON();
	
		$q.all([
		        tercelServiceProviderPromise.getJSON("/data/componentDeployment.json"),
		        tercelServiceProviderPromise.getJSON("/data/dimension.json"),
		        tercelServiceProviderPromise.getJSON("/data/fleet.json"),
		        tercelServiceProviderPromise.getJSON("/data/fleetEquipment.json"),
		        tercelServiceProviderPromise.getJSON("/data/parameter.json"),
		        tercelServiceProviderPromise.getJSON("/data/physicalQuantity.json"),
		        tercelServiceProviderPromise.getJSON("/data/sensorDeployment.json"),
		        tercelServiceProviderPromise.getJSON("/data/subsystem.json"),
		        tercelServiceProviderPromise.getJSON("/data/system.json"),
		        tercelServiceProviderPromise.getJSON("/data/unit.json"),
		        tercelServiceProviderPromise.getJSON("/data/parameterInteraction.json")		     		       
		]).then(
			function (data) {
				var models = {};
				
				for (var i = 0; i < data.length; i++) {
					for (var key in data[i]) {
						
						var className = cap(key);
						var theClass = classes[className];
						var theAttributesList = data[i][key];
						
						var instanceCollection = [];
						
						for (var j = 0; j < theAttributesList.length; j++) {
							var theAttributes = theAttributesList[j];
							
							var duplicate = _.find(instanceCollection, function (instance) {
								return instance.id == theAttributes.id;
							});
							
							if (duplicate) {
								continue;
							}
							
							try {
								var anInstance = new theClass(theAttributes);
								instanceCollection.push(anInstance);	
							}
							catch (err) {
								alert(className + err);
							}
						}
												
						models[className] = instanceCollection;
					}					
				}			
				
				$scope.models = models;
				
				
				/*
				console.log('done models');
				
				var systemModel = models['system'][0];
				var test = systemModel.get('subsystem');
				test = test.get('parameterInteraction');
				test = test.get('parameter');
				test = test.get('title');
				
				console.log(test);
				
				*/
				
			},
			function (error) {
				alert('error !');
			}
		);				
    };		
	
};



app.controller(controllers);