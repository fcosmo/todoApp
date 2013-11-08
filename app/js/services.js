'use strict';

/* Services */


app.service('gameService', ['$http', function ($http) {
	
	this.getJSON = function () {
		 $http({method: 'GET', url: '/package.json'}).
	   		success(function(data, status, headers, config) {
	   			alert("gameService:" + JSON.stringify(data));
	        }).
	        error(function(data, status, headers, config) {
	   			alert('error');
	        });					
	}
	
}])



app.service('gameServiceFactory', ['$http', function ($http) {
	
	return {
		getJSON : function () {
			 $http({method: 'GET', url: '/package.json'}).
		   		success(function(data, status, headers, config) {
		   			alert("gameServiceFactory:" + JSON.stringify(data));
		        }).
		        error(function(data, status, headers, config) {
		   			alert('error');
		        });					
		}		
	}	
}])



app.provider('gameServiceProvider', function () {
	
	this.configValue = "some config value";
	this.setConfigValue = function (newConfigValue) {
		this.configValue = newConfigValue;
	}
	
	this.$get =  ['$http', function ($http) {
		
		var provider = this;
		
		return {
			getJSON : function () {
				 $http({method: 'GET', url: '/package.json'}).
			   		success(function(data, status, headers, config) {
			   			alert("gameServiceProvider:" + provider.configValue + JSON.stringify(data));
			        }).
			        error(function(data, status, headers, config) {
			   			alert('error');
			        });					
			}		
		}

		
	}];
	
});
	

app.config(function (gameServiceProviderProvider) {
	gameServiceProviderProvider.setConfigValue("Warxxx");
});



app.provider('gameServiceProviderWithParam', function () {
	
	this.configValue = "some config value";
	this.setConfigValue = function (newConfigValue) {
		this.configValue = newConfigValue;
	}
	
	this.$get =  ['$http', function ($http) {
		
		var provider = this;
		
		return {
			getJSON : function (url, success, error) {
				 $http({method: 'GET', url: url}).
			   		success(success).
			        error(error);					
			}		
		}		
	}];
	
});




app.provider('gameServiceProviderPromise', function () {
	
	this.configValue = "some config value";
	this.setConfigValue = function (newConfigValue) {
		this.configValue = newConfigValue;
	}
	
	this.$get =  ['$http', '$q', function ($http, $q) {
		
		var provider = this;
		
		return {
			getJSON : function (url) {
				
				var deferred = $q.defer();
				
				$http({method: 'GET', url: url}).
			   		success(function (data, status, headers, config) {
			   			deferred.resolve(data);
			   		}).
			        error(function (data, status, headers, config) {
			   			deferred.reject(data);
			   		});		
				
				return deferred.promise;
			}		
		}		
	}];
	
});

/*
angular.module('myApp.services', []).
    service('Activities', function($http, $q) {
        this.get = function(from, to){
            var deferred = $q.defer();
            var url = 'user/activities?from='+from+'&to='+to;
            $http.get(url).success(function(data, status) {
                // Some extra manipulation on data if you want...
                deferred.resolve(data);
            }).error(function(data, status) {
                deferred.reject(data);
            });

            return deferred.promise;
        }
    }
);


The call inside the controller (don't forget to DI the service in the controller's parameters):

    var promise = Activities.get(now, monthAgo);
    promise.then(
        function(activities){$scope.transactions = activities;}
        ,function(reason){alert('Failed: ' + reason);}
     );

  
  
*/

/*
app.factory("game", function () {
	var blah = "xxx blah";
	return {
		alert : function (something) {
			alert(something + blah);
		},
		
		setBlah : function (value) {
			blah = value;
		}
		
	}
});

phonecatServices.factory('Phone', ['$resource',
  function($resource){
    return $resource('phones/:phoneId.json', {}, {
      query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
    });
  }]);


this.$get = ['$rootScope', '$location',
        function( $rootScope, $location) {
            $rootScope.$on('$locationChangeSuccess', function () {
                alert('Test2');
            });

            alert('Test2');

            return {};
        }];

*/
/*
app.factory("game", function ($http) {
	return function($http)
	
});

*/

/*
app.provider("game", function () {
	var type;
	
	return {
		setType: function (value) {
			type = value;
		},
		
		$get: ['$resource', function ($resource) {
			return {
				title: function () {
					return type + "Craft 2222";
				},
				
				getJSON : function () {
					 $resource('phones/:phoneId.json', {}, {
					      query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
					    });
				}
			};
		}]
	};
});
*/

/*
app.provider("game", function () {
	var type;
	
	return {
		setType: function (value) {
			type = value;
		},
		
		$get: ['$http', function ($http) {
			return function ($http) {				
				return {
					title: function () {
						return type + "Craft 2222";
					},
					
					getJSON : function () {
						 $http({method: 'GET', url: '/test/package.json'}).
					   		success(function(data, status, headers, config) {
					   			alert('success');
					        }).
					        error(function(data, status, headers, config) {
					   			alert('error');
					        });			
					}
				}
			};
		}]
	};
});
/*
app.provider("game", function () {
	var type;
	
	return {
		setType: function (value) {
			type = value;
		},
		
		$get: ['$http', function ($http) {
			return function ($http) {				
				return {
					title: function () {
						return type + "Craft 2222";
					},
					
					getJSON : function () {
						 $http({method: 'GET', url: '/test/package.json'}).
					   		success(function(data, status, headers, config) {
					   			alert('success');
					        }).
					        error(function(data, status, headers, config) {
					   			alert('error');
					        });			
					}
				}
			};
		}]
	};
});
*/
/*
app.config(function (gameProvider) {
	gameProvider.setType("War");
});
/*
app.factory('falkonryTercelServices', ['$http',
  function($http){
	 return {
		 getSomeJson : function () {
			 $http({method: 'GET', url: '/test/package.json'}).
		   		success(function(data, status, headers, config) {
		   			alert('success');
		        }).
		        error(function(data, status, headers, config) {
		   			alert('error');
		        });			 
		 }
	 }
  }
	
   
]);



var phonecatServices = angular.module('phonecatServices', ['ngResource']);

phonecatServices.factory('Phone', ['$resource',
  function($resource){
    return $resource('phones/:phoneId.json', {}, {
      query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
    });
  }]);
*/