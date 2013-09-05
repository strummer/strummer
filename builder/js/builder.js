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
          }
          else {
            angular.forEach(panes, function(pane) {
              pane.selected = false;
            });
      
            pane.selected = true;
          }
        };

        this.addPane = function(pane) {
          // Select first tab by default
          // if (panes.length == 0) $scope.select(pane);
          panes.push(pane);
        };
      },
      template:
        '<nav>' +
          '<ul class="nav nav-tabs">' +
            '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">' +
              '<a href="" ng-click="toggle(pane)">{{pane.title}}</a>' +
            '</li>' +
          '</ul>' +
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
      scope: { title: '@' },
      link: function(scope, element, attrs, tabsCtrl) {
        tabsCtrl.addPane(scope);
      },
      template:
        '<div class="pane" ng-class="{active: selected}" ng-transclude>' +
        '</div>',
      replace: true
    };
  });


  app.run(function($rootScope, $log) {
    $rootScope.$log = $log;
  });
  