/* app.js - Contains main app loader and injects builder dependency */

var example = angular.module('example', ['builder']);

/* Angular uses $log to wrap console.log
    We append it to the global scope (namespace) to ensure we can log from anywhere in the app. */
     
example.run(function($rootScope, $log) {
    $rootScope.$log = $log;
});