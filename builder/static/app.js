/* builder.js - Contains main app loader and injects dependencies */

var builder = angular.module('builder', ['nav']);

/* Angular uses $log to wrap console.log
    We append it to the global scope (namespace) to ensure we can log from anywhere in the app. */
     
builder.run(function($rootScope, $log) {
    $rootScope.$log = $log;
});

