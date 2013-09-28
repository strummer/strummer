/* nav - creates navigation and menu heirarchy */

var nav = angular.module('nav', ['settings', 'structure', 'ipsum']);

menuController = function($scope, $element, $log, $httpProvider) {
    $httpProvider.responseInterceptors.push('ipsumInterceptor');

    var panes = $scope.panes = [];

    $scope.log = $log;
    
    $scope.toggle = function(pane) {
        if(pane.selected) {
            pane.selected = false;
            panes.selected = false;
        }
        else {
            angular.forEach(panes, function(pane) {
                pane.selected = false;
            });

            pane.selected = true;
            panes.selected = true;  // controls overall nav active state
        }
    };

    this.addPane = function(pane) {
        // Select first tab by default
        // if (panes.length == 0) $scope.select(pane);
        panes.push(pane);
    };
};

nav.directive('menu', function() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        controller: menuController,
        templateUrl: 'static/nav/menu.html', // It seems crazy to define a static path like this. Need to look into relative options.
        replace: true
    };
});

nav.directive('pane', function() {
    return {
        require: '^menu',
        restrict: 'E',
        transclude: true,
        scope: { title: '@', symbol: '@' },
        link: function(scope, element, attrs, menuCtrl) {
            // We inherit the menu controller (menuCtrl) from ^menu (see 'require' above)
            menuCtrl.addPane(scope);
        },
        templateUrl: 'static/nav/pane.html',
        replace: true
    };
});
