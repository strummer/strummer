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

    var structure = {
        name: "Comments",
        type: "list",
        children: [{
            name: "Author",
            type: "link",
            link: "authors",
            children: []
        }, {
            name: "Posts",
            type: "list",
            children: [{
                name: "Contents",
                type: "text",
                children: []
            }]
        }, {
            name: "Timestamp",
            type: "time",
            children: []
        }]
    };

    return {
        get: function() {
            return(structure);
        },
        set: function(newValue) {
            structure = newvalue;
            return(structure);
        }
    };
});