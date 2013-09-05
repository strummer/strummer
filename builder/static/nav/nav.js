var app = angular.module('builder', []).
  directive('menu', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      controller: function($scope, $element, $log) {
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
      },
      template:
        '<nav ng-class="{active:panes.selected}">' +
          '<div class="button ui {{pane.title}}" ng-repeat="pane in panes" ng-class="{active:pane.selected}">' +
            '<a href="" ng-click="toggle(pane)">{{pane.symbol}}</a>' +
          '</div>' +
          '<div class="tab-content" ng-transclude></div>' +
        '</nav>',
      replace: true
    };
  }).
  directive('pane', function() {
    return {
      require: '^menu',
      restrict: 'E',
      transclude: true,
      scope: { title: '@', symbol: '@' },
      link: function(scope, element, attrs, menuCtrl) {
        // We inherit the menu controller (menuCtrl) from ^menu (see 'require' above)
        menuCtrl.addPane(scope);
      },
      template:
        '<div class="pane" ng-class="{active: selected}" ng-transclude>' +
        '</div>',
      replace: true
    };
  }).
  directive('structure', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: { object: '@', link: '@', type: '@' },
      controller: function($scope, $element, $log) {
        var structures = $scope.structures = {};
        $scope.log = $log;
        structures += $scope;
        $scope.log.log(structures);
      },
      template:
        '<div class="structure {{object}}">{{object}} {{type}} {{link}}' +
          '<div class="structure" ng-repeat="structure in structures">' +
          '</div>' +
        '</div>',
      replace: true
    };
  });


  app.run(function($rootScope, $log) {
    $rootScope.$log = $log;
  });
  