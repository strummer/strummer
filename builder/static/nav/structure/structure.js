/* Structure - Visualize your application */

var structure = angular.module('structure', []);

structure.directive('structure', function($compile) {
    return {
        restrict: 'E',
        scope: { structure: '=' },

     compile: function(tElement, tAttr, $log) {
            var contents = tElement.contents().remove();
            var compiledContents;
            return function(scope, iElement, iAttr) {
                if(!compiledContents) {
                    compiledContents = $compile(contents);
                }
                compiledContents(scope, function(clone, scope) {
                    iElement.append(clone);
                });
            };
        },
        templateUrl: 'static/nav/structure/structure.html'
    };
});

structureController = function($scope, $element, $log) {
    $scope.log = $log;

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
            children: []
        }, {
            name: "Timestamp",
            type: "time",
            children: []
        }]
    };
};
