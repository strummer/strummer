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
  controller('structureController', function($scope) {
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
  }).
  directive('structure', function($compile) {
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
      template:
        '<p>{{structure.name}}</p>' +
        '<ul>' +
          '<li ng-repeat="child in structure.children">' +
            '<tree structure="child"></tree>' +
          '</li>' +
        '</ul>'
    };
  }).
  directive('settings', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: { domain: '@' },
      controller: function($scope, $element, $log) {
        var domain = $scope.domain = "";
        var placeholder = $scope.placeholder = "e.g. www.strummer.io";

        $scope.log = $log;
      },
      template:
        '<div class="settings">' +
          '<form title="settings">' +
            '<h2>Configure Your Domain</h2>' +
            '<label>Hostname: ' +
            '</label>' +
            '<input type="text" ng-model="domain" placeholder="{{placeholder}}"/>' +
            '<label>Error validation goes here' +
            '</label>' +
            '<br /><br />' +
            '<input type="submit" />' +
          '</form>' + 
        '</div>',
      replace: true
    };
  });


  app.run(function($rootScope, $log) {
    $rootScope.$log = $log;
  });
  