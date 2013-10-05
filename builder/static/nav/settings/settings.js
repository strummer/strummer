/* Settings - Contains per-account things like Domain, etc */

var settings = angular.module('settings', []);

settingsController = function($scope, $element, $rootScope, $log, domainFactory) {
    $scope.domain = "";

    domainFactory.get().success(function(data) {
        $scope.domain = data.domain;
    });

    $scope.placeholder = "e.g. www.strummer.io";

    $scope.saveDomain = function() {
        $scope.domain = domainFactory.set($scope.domain);
    };

    $scope.toggleIpsum = function() {
        $rootScope.ipsum.enabled = $scope.ipsumEnabled;
    };

    $scope.log = $log;
};

settings.directive('settings', function() {
    return {
        restrict: 'E',
        require: 'ngModel',
        transclude: true,
        scope: { domain: '@'},
        controller: 'settingsController',
        templateUrl: 'static/nav/settings/settings.html',
        replace: true
    };
});

settings.factory("domainFactory", function($http, $log) {
    // Placeholder data model for settings.domain
    // Can swap in other data sources here when ready

    var domain = "";

    return {
        get: function() {
            return $http.get('static/nav/settings/settings.json');
        },
        set: function(newValue) {
            domain = newValue;
            return(domain);
        }
    };
});