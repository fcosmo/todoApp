'use strict';




var controllers = {};

controllers.NavBarCtrl = function () {
	this.home= function(){
		alert("home");
	};
};

/*
 Simple One
 
controllers.SideBarCtrl = function (tercelServiceProviderPromise) {
	this.newNote= function (){
		//game.getJSON();
		var promiseFleet = tercelServiceProviderPromise.getJSON("/data/fleet.json");		
				
		promiseFleet.then(
				function (data) {
					alert(JSON.stringify(data)); 	
				},
				function (error) {
					alert('error !');
				}
		);				
				
		
    };		
	
};
*/

/*  List of Promises 
 
controllers.SideBarCtrl = function (tercelServiceProviderPromise, $q) {
	this.newNote= function (){
		//game.getJSON();
		var promiseFleet = tercelServiceProviderPromise.getJSON("/data/fleet.json");		
		var promiseDimension = tercelServiceProviderPromise.getJSON("/data/dimension.json");		

		$q.all([
		        promiseFleet,
		        promiseDimension
		]).then(
			function (data) {
				var promiseData0 = JSON.stringify(data[0]);
				var promiseData1 = JSON.stringify(data[1]);
				
				alert(promiseData0 + promiseData1);
				
			},
			function (error) {
				alert('error !');
			}
		);				
		
		
		
    };		
	
};
*/

controllers.SideBarCtrl = function (tercelServiceProviderPromise, $q, $scope) {
	
		// move this later
	$scope.switchOnFieldType = function (metas, selectedMetaName, fieldMetaValue) {
		
		var fieldMetaValueArray = fieldMetaValue.split('^');
		
		var fieldMetaKey = fieldMetaValueArray[0];
		
		var fieldMetas = metas[selectedMetaName].fieldMeta;
		
		var fieldMeta = fieldMetas[fieldMetaKey];
	
		return fieldMeta.classMeta;
	}
	
	
	$scope.resolveEntityField = function (metas, selectedMetaName, fieldMetaValue) {

		var fieldMetaValueArray = fieldMetaValue.split('^');
		
		
		var fieldMetaKey = fieldMetaValueArray[0];
		
		var fieldMetas = metas[selectedMetaName].fieldMeta;
		
		var fieldMeta = fieldMetas[fieldMetaKey];
	
			 
		 
		 
		var fieldMetaValue =  fieldMetaValueArray[1];
		var models =  $scope.models[fieldMeta.classMeta];
		

		if (fieldMeta.list) {
			var fieldMetaValueList = fieldMetaValue.split(',');
			return "[ " + fieldMetaValueList.length + " " + $scope.metas[fieldMeta.classMeta].classMeta.label + "s ]" ;
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
		
		$scope.selectedMetaName = fieldMeta.classMeta;		
		
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
		var models =  $scope.models[fieldMeta.classMeta];
		
		
		var selectedModelList = [];
			
			var allModels = $scope.models[fieldMeta.classMeta];
			var fieldMetaValueList = fieldMetaValue.split(',');
			for (var i = 0; i < fieldMetaValueList.length; i++) {
				var id = fieldMetaValueList[i];
				var entry = _.findWhere(allModels, {"id": id});	
				selectedModelList.push(entry);
				
			}
			
			
		
		
		$scope.selectedModels = selectedModelList;
		$scope.selectedMetaName = fieldMeta.classMeta;		
			
	
	}
	
	$scope.selectedMeta = function () {
		
		if (typeof $scope.selectedMetaName == "undefined") {
			return "";
		}
		
		return $scope.metas[$scope.selectedMetaName];
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

					// for each meta
				for (var i = 0; i < data.length; i++) {
						// goes once - basically get meta key
						// assign metas from data
					var metaObject = data[i];
					var metaName = metaObject.classMeta.name;																
					metas[metaName] = metaObject;
												
				}			
				
				$scope.metas = metas;
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
		        tercelServiceProviderPromise.getJSON("/data/parameterInteraction.json"),
		        tercelServiceProviderPromise.getJSON("/data/physicalQuantity.json"),
		        tercelServiceProviderPromise.getJSON("/data/sensorDeployment.json"),
		        tercelServiceProviderPromise.getJSON("/data/subsystem.json"),
		        tercelServiceProviderPromise.getJSON("/data/system.json"),
		        tercelServiceProviderPromise.getJSON("/data/unit.json")		        		        
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
												
						models[key] = instanceCollection;
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