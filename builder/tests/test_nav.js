describe('nav', function() {

  beforeEach(module('nav'));

  // We have to load the templates in advance, otherwise the browser tries to fetch them dynamically which causes tests to fail.
  // Reference: https://github.com/vojtajina/ng-directive-testing
  beforeEach(module('static/nav/menu.html', 'static/nav/pane.html'));

  describe('directive: menu', function() {
    var scope, html, element, directive, compiled;
    beforeEach(function() {
      html = '<menu>' +
                '<pane title="CMS" symbol="#">' +
                  'Submenu stuff goes here' +
                '</pane>' +
              '</menu>';

      inject(function($compile, $rootScope, $templateCache) {
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