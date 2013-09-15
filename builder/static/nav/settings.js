// 

var settings = angular.module('settings', []);

settingsController = function($scope, $element, $log, domainFactory) {
    var domain = $scope.domain = "";
    var ref = new Firebase('https://bdickason.firebaseio.com/settings/domain');

    domainFactory(ref, $scope, 'domain');

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

settings.factory("domainFactory", ["$q", "$parse", "$timeout",
    // Create firebase wrapper factory to retrieve domain and other settings
    // Can easily swap this out when we switch to another data source
    function($q, $parse, $timeout) {
        return function(ref, scope, name) {
            var af = new AngularFire($q, $parse, $timeout, ref);
            return af.associate(scope, name);
        };
    }
]);