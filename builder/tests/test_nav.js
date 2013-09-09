describe('nav', function() {

  beforeEach(module('nav'));

  describe('directive: menu', function() {
    var scope, html, element, directive, compiled;
    beforeEach(function() {
      html = '<menu>' +
                '<pane title="CMS" symbol="#">' +
                  'Submenu stuff goes here' +
                '</pane>' +
              '</menu>';

      inject(function($compile, $rootScope, $templateCache) {
        // We have to load the templates by hand, otherwise the directives try to grab them from the server upon running
        // Reference: http://stackoverflow.com/a/15231422
        menuTemplate = '<nav ng-class="{active:panes.selected}">' +
                          '<div class="button ui {{pane.title}}" ng-repeat="pane in panes" ng-class="{active:pane.selected}">' +
                            '<a href="" ng-click="toggle(pane)">{{pane.symbol}}</a>' +
                          '</div>' +
                          '<div class="tab-content" ng-transclude></div>' +
                        '</nav>';
        $templateCache.put('static/nav/menu.html', menuTemplate);

        paneTemplate = '<div class="pane" ng-class="{active: selected}" ng-transclude>' +
                       '</div>';
        $templateCache.put('static/nav/pane.html', paneTemplate);

        scope = $rootScope;
        element = angular.element(html);
        compiled = $compile(element);
        compiled(scope);
        scope.$digest();
      });
    });
    it('Should select a single pane if no panes are selected', function() {

      expect('a').toEqual('a');
    });
    it('Should de-select the current pane if the current pane is selected', function() {

    });

    it('Should select the current pane and de-select the other pane if another pane is selected', function() {

    });

  });
});