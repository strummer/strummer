/* builder.js - Contains main app loader, builder directive, and injects dependencies */

var builder = angular.module('builder', ['nav']);

/* Controller for 'builder' directive */
builderController = function($log) {
    $log.log("got here");
};

/* Adding 'builder' directive initializes the builder menu, etc */
builder.directive('builder', function() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        controller: builderController,
        templateUrl: 'static/app.html', // It seems crazy to define a static path like this. Need to look into relative options.
        replace: false
    };
});

/* Angular uses $log to wrap console.log
    We append it to the global scope (namespace) to ensure we can log from anywhere in the app. */
     
builder.run(function($rootScope, $log) {
    $rootScope.$log = $log;
});



