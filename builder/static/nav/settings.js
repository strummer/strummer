// 

var settings = angular.module('settings', []);

settingsController = function($scope, $element, $log, domainFactory) {
    var domain = $scope.domain = domainFactory.get();

    var placeholder = $scope.placeholder = "e.g. www.strummer.io";

    $scope.log = $log;
};

settings.directive('settings', function() {
    return {
        restrict: 'E',
        require: 'ngModel',
        transclude: true,
        scope: { domain: '@'},
        controller: 'settingsController',
        templateUrl: 'static/nav/settings.html',
        replace: true
    };
});

settings.factory("domainFactory", function() {
    // Placeholder data model for settings.domain
    // Can swap in other data sources here when ready

    var domain = "";

    return {
        get: function() {
            return(domain);
        },
        set: function(newValue) {
            domain = newValue;
        }
    };
});