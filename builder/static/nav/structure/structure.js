/* Structure - Visualize your application */

var structure = angular.module('structure', []);

structure.directive('structure', function($compile) {
    return {
        restrict: 'E',
        scope: { structure: '=' },
        transclude: true,
        replace: true,
        templateUrl: 'static/nav/structure/structure.html'
    };
});

structureController = function($scope, $element, $log) {
    $scope.log = $log;

    $scope.delete = function(data) {
        data.nodes = [];
    };

    $scope.structure = {
        name: "Comments",
        type: "list",
        children: [{
            name: "Author",
            type: "link",
            link: "authors",
            children: []
        }, {
            name: "Content",
            type: "text",
            children: [{
                name: "test",
                children: []
            }]
        }, {
            name: "Timestamp",
            type: "time",
            children: []
        }]
    };
};
