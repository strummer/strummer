/* Ipsum - Override all Factory outputs with lorem ipsum while building */

var ipsum = angular.module('ipsum', ['hipster_lang']);

ipsumController = function($rootScope, ipsumContent, hipsterFactory) {
  // Runs once when the module is first loaded
  $rootScope.ipsum.initialized = true;

  // Load ipsum config
  if(!$rootScope.ipsum.language) {
    // Load the proper ipsum module
    $rootScope.ipsum.language = 'hipster';
  }

  // Load external content
  angular.copy(hipsterFactory, ipsumContent); // Requires deep copy
};

ipsum.factory('ipsumInterceptor', function($q, $rootScope, $log, hipsterFactory) {
  // Ipsum factory is called after each httprequest
  if(!$rootScope.ipsum) {
    $rootScope.ipsum = {};
  }

  if(!$rootScope.ipsum.initialized) {
    var ipsumContent = {};
    ipsumController($rootScope, ipsumContent, hipsterFactory);
  }

  return function(promise) {
    return promise.then(function(response) {
      // Only kick off logic if app has enabled ipsum (to allow users to toggle on/off on the fly)
      if($rootScope.ipsum.enabled) {
        // We should only affect JSON objects
        if(response.headers()['content-type'] === "application/json") {
          // Process JSON here
          data = response.data;
          ipsumData = {};

          angular.forEach(data, function(value, key) {
            switch(typeof(value)) {
              case "string":
                ipsumData[key] = ipsumContent["string"];
                break;
              case "number":
                ipsumData[key] = ipsumContent["number"];
                break;
              default:
                ipsumData[key] = ipsumContent["default"];
                break;
            }
          });
          response.data = ipsumData;
        }
      }
      return response;
    });
  };
});