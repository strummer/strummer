
var nav = angular.module('nav', []).
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
      templateUrl: 'static/nav/menu.html', // It seems crazy to define a static path like this. Need to look into relative options.
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
      templateUrl: 'static/nav/pane.html',
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
      templateUrl: '/static/nav/structure.html'
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
      templateUrl: '/static/nav/settings.html',
      replace: true
    };
  });
