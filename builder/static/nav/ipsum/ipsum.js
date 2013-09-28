/* Ipsum - Override all Factory outputs with lorem ipsum while building */

ipsum.factory('ipsumInterceptor', function($q, $log) {
  return function(promise) {
    return promise.then(function(response) {
      // Do nothing
      return response;
    }, function(response) {
      // Service updates the UI
      
      // Process response here 
      
      $log.log(response);
      return $q.reject(response);
    });
  };
});