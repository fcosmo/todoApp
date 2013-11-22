'use strict';



var controllers = {};


controllers.PageCtrl = function (tercelServiceProviderPromise, $q, $scope) {
	this.pageHeader = function () {
		return '/app/partials/pageHeader.html';
	}
	
	this.pageBody = function () {
		return '/app/partials/pageBody.html';		
	}	
}

controllers.TabCtrl = function ($scope) {
			
	this.tabTable = {
		"explorer": {
			"label":"Explorer",
			"partialPage":"/app/partials/entityExplorer.html"			
		},
		"monitor": {
			"label":"Monitor",
			"partialPage":"/app/partials/entityMonitor.html"			
		},
		"editor": {
			"label":"Editor",
			"partialPage":"/app/partials/entityEditor.html"			
		}
			
	}
	
	
	this.tabKeys = function () {
		return Object.keys(this.tabTable);
	}
	
	this.isTabSelected = function (tabKey) {
		return $scope.currentTabKey 
			? $scope.currentTabKey === tabKey 
			: "explorer" === tabKey;	
	}
	
	this.clickTab = function (tabKey) {
		$scope.currentTabKey = tabKey;
	}	
	
	
	this.tabContentPage = function () {		
		return $scope.currentTabKey 
			? this.tabTable[$scope.currentTabKey].partialPage 
			: this.tabTable["explorer"].partialPage;
	}
	
}

controllers.EntityExplorerCtrl = function (tercelServiceProviderPromise, $q, $scope) {
	
	this.clickField = function (model, fieldName) {
		var fieldMeta = model.meta().fieldMetaMap[fieldName];
		var fieldModel = model.get(fieldName);
		$scope.selectedMetaName = fieldMeta.type.entityMeta.name;		
		$scope.selectedModels = [fieldModel];	
	}

	this.clickFieldList = function (model, fieldName) {		
		var fieldMeta = model.meta().fieldMetaMap[fieldName];
		var fieldCollection = model.get(fieldName);
		$scope.selectedMetaName = fieldMeta.type.entityMeta.name;		
		$scope.selectedModels = fieldCollection.models;				
	}	


	this.selectedMeta = function () {

		if (typeof $scope.selectedMetaName === "undefined") {
			return "";
		}
		var scope = $scope;
		var theClass = $scope['classes'][$scope.selectedMetaName];
		var meta = theClass.meta();
		var test = meta.fieldNames();
		return meta;
	}


	this.selectedModel = function () {
		var selectedModels = $scope.selectedModels;
		return selectedModels;
	}	


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
		        	function (dataList) { 
			        	core.metaService(dataList);	
			        	$scope.metas = core.metas;
	        			$scope.classes = core.classes;
	        			console.log('done metas');
		        	},
		        	
		        	function (error) {
		       			alert('error !');
		       		}
		        );				
	};		

/*
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
  
 */


	this.loadData= function (){
		//game.getJSON();
		Backbone.Relational.store.addModelScope(core.classes);

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
		        			$scope.metas = core.metas;
		        			$scope.classes = core.classes;		        		    		        			
		        			core.modelService(data);

		        			$scope.models = core.models;

		        		},
		        		function (error) {
		        			alert('error !');
		        		}
		        );				
	};			
}

controllers.PageHeaderCtrl = function (tercelServiceProviderPromise, $q, $scope) {
	
	this.home= function() {
		alert("home");
	};		
}

controllers.PageBodyCtrl = function (tercelServiceProviderPromise, $q, $scope) {




};



app.controller(controllers);