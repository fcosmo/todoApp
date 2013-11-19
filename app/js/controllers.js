'use strict';



var controllers = {};

controllers.NavBarCtrl = function () {
	this.home= function(){
		alert("home");
	};
};


controllers.SideBarCtrl = function (tercelServiceProviderPromise, $q, $scope) {



	this.clickField = function (model, fieldName) {
		var fieldMeta = model.meta().fieldMetaMap[fieldName];
		var fieldModel = model.get(fieldName);
		$scope.selectedMetaName = fieldMeta.type.entityMeta.name;		
		$scope.selectedModels = [fieldModel];	
	}

	$scope.clickFieldList = function (model, fieldName) {		
		var fieldMeta = model.meta().fieldMetaMap[fieldName];
		var fieldCollection = model.get(fieldName);
		$scope.selectedMetaName = fieldMeta.type.entityMeta.name;		
		$scope.selectedModels = fieldCollection.models;				
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
		var test = meta.fieldNames();
		return meta;
	}



	$scope.selectedModel = function () {
		var selectedModels = $scope.selectedModels;
		return selectedModels;
	}	

	// the model holders;
	$scope.selectedModels = null;

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
			        	metaService(data);	
			        	$scope.metas = metas;
	        			$scope.classes = classes;
	        			console.log('done metas');
		        	},
		        	
		        	function (error) {
		       			alert('error !');
		       		}
		        );				
	};		




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
		        		    
		        			modelService(data);

		        			$scope.models = models;

		        		},
		        		function (error) {
		        			alert('error !');
		        		}
		        );				
	};		

};



app.controller(controllers);