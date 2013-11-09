'use strict';


var controllers = {};

controllers.NavBarCtrl = function () {
	this.home= function(){
		alert("home");
	};
};

/*
 Simple One
 
controllers.SideBarCtrl = function (gameServiceProviderPromise) {
	this.newNote= function (){
		//game.getJSON();
		var promiseFleet = gameServiceProviderPromise.getJSON("/data/fleet.json");		
				
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
 
controllers.SideBarCtrl = function (gameServiceProviderPromise, $q) {
	this.newNote= function (){
		//game.getJSON();
		var promiseFleet = gameServiceProviderPromise.getJSON("/data/fleet.json");		
		var promiseDimension = gameServiceProviderPromise.getJSON("/data/dimension.json");		

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

controllers.SideBarCtrl = function (gameServiceProviderPromise, $q, $scope) {
	
	/*
	  $scope.templates =
		    [ { name: 'template1.html', url: '/partials/template1.html'}
		    , { name: 'template2.html', url: '/partials/template2.html'} ];
		  $scope.template = $scope.templates[0];	
		  */
	
	this.selectMeta = function (metaName) {
		$scope.models = $scope.models || {};
		var fetchDataPromise = gameServiceProviderPromise.getJSON("/data/" + metaName + ".json");
		fetchDataPromise.then(function (data) {
			for (var key in data) {
				$scope.models[key.toLowerCase()] = data[key];
			}	
			$scope.selectedMetaName = metaName.toLowerCase();			
		}, function () { alert('unable to download')});		
	}	
	
	
	this.showSelectedMasterView = function () {	
		
		return '/app/partials/detailView.html';
	}
	
	
	this.loadMeta = function (){
		//game.getJSON();
	
		$q.all([
		        gameServiceProviderPromise.getJSON("/meta/componentDeployment.json"),
		        gameServiceProviderPromise.getJSON("/meta/dimension.json"),
		        gameServiceProviderPromise.getJSON("/meta/fleet.json"),
		        gameServiceProviderPromise.getJSON("/meta/fleetEquipment.json"),
		        gameServiceProviderPromise.getJSON("/meta/parameter.json"),
		        gameServiceProviderPromise.getJSON("/meta/physicalQuantity.json"),
		        gameServiceProviderPromise.getJSON("/meta/sensorDeployment.json"),
		        gameServiceProviderPromise.getJSON("/meta/subsystem.json"),
		        gameServiceProviderPromise.getJSON("/meta/system.json"),
		        gameServiceProviderPromise.getJSON("/meta/unit.json"),
		        gameServiceProviderPromise.getJSON("/meta/parameterInteraction.json"),
		        
		     
		]).then(
			function (data) {
				var metas = {};

					// for each meta
				for (var i = 0; i < data.length; i++) {
						// goes once - basically get meta key
					for (var key in data[i]) {
							// assign metas from data
						var metaObject = data[i][key];
						var metaName = key.toLowerCase();																
						metas[metaName] = metaObject;
						
						
					}					
				}			
				
				$scope.metas = metas;
				console.log('done');
				
			},
			function (error) {
				alert('error !');
			}
		);				
    };		
		
	
	this.loadData= function (){
		//game.getJSON();
	
		$q.all([
		        gameServiceProviderPromise.getJSON("/data/componentDeployment.json"),
		        gameServiceProviderPromise.getJSON("/data/dimension.json"),
		        gameServiceProviderPromise.getJSON("/data/fleet.json"),
		        gameServiceProviderPromise.getJSON("/data/fleetEquipment.json"),
		        gameServiceProviderPromise.getJSON("/data/parameter.json"),
		        gameServiceProviderPromise.getJSON("/data/parameterInteraction.json"),
		        gameServiceProviderPromise.getJSON("/data/physicalQuantity.json"),
		        gameServiceProviderPromise.getJSON("/data/sensorDeployment.json"),
		        gameServiceProviderPromise.getJSON("/data/subsystem.json"),
		        gameServiceProviderPromise.getJSON("/data/system.json"),
		        gameServiceProviderPromise.getJSON("/data/unit.json")		        		        
		]).then(
			function (data) {
				var models = {};
				var modelMetas = {};
				
				for (var i = 0; i < data.length; i++) {
					for (var key in data[i]) {
						models[key] = data[i][key];
					}					
				}			
				
				$scope.models = models;
				console.log('done');
				
			},
			function (error) {
				alert('error !');
			}
		);				
    };		
	
};


/* chaining of services - come back later 

controllers.SideBarCtrl = function (gameServiceProviderPromise, $q) {
	this.newNote= function (){
		
		var success = function (data) {
			console.log(JSON.stringify(data));
		}
		
		var error = function (error) {
			alert('error');
		}
		
		//game.getJSON();
		//var promiseDimension = gameServiceProviderPromise.getJSON("/data/dimension.json");		
	
		      gameServiceProviderPromise.getJSON("/data/fleet.json").then(success, error)
		.then(gameServiceProviderPromise.getJSON("/data/dimension.json").then(success, error))
		.then(gameServiceProviderPromise.getJSON("/data/parameter.json").then(success,error));
		
			
		
				
				
				
		
    };		
	
}
*/	


/*
controllers.SideBarCtrl = function () {
	this.newNote= function(){
		alert("new Note");
	};
};

 var promise = Activities.get(now, monthAgo);
    promise.then(
        function(activities){$scope.transactions = activities;}
        ,function(reason){alert('Failed: ' + reason);}
     );


*/
app.controller(controllers);