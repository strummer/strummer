/* Structure - Visualize your application */

var structure = angular.module('structure', []);

structureController = function($scope, $element, $log, structureFactory) {
    $scope.structure = structureFactory.get();

    $scope.saveStructure = function() {
        $scope.structure = structureFactory.set($scope.structure);
    };

    $scope.log = $log;
};

structure.directive('structure', function($compile) {
    return {
        restrict: 'E',
        scope: { structure: '=' },
        transclude: true,
        replace: true,
        templateUrl: 'static/nav/structure/structure.html'
    };
});

structure.factory("structureFactory", function() {
    // Placeholder data model for structures
    // Can swap in other data sources here when ready

    var structures = [];

    return {
        get: function() {
            return(structures);
        },
        set: function(newValue) {
            structures = newValue;
            return(structure);
        },
        add: function(newStructure) {
            structure = {};
            // structure.title = newStructure.nodeName;

            structures.push(newStructure);
            return(structure);
        }
    };
});