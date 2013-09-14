// 

var settings = angular.module('settings', []);

settingsController = function($scope, $element, $log, angularFire) {
    var domain = $scope.domain = "";
    var ref = new Firebase('https://bdickason.firebaseio.com/settings/domain');

    angularFire(ref, $scope, 'domain');

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