describe('nav', function() {

  beforeEach(module('nav'));

  // We have to load the templates in advance, otherwise the browser tries to fetch them dynamically which causes tests to fail.
  // Reference: https://github.com/vojtajina/ng-directive-testing
  beforeEach(module('static/nav/menu.html', 'static/nav/pane.html'));

  describe('directive: menu', function() {
    var scope;

    // Setup DOM
    var html, element, compiled;
    beforeEach(function() {
      html = '<menu>' +
                '<pane title="CMS" symbol="#">' +
                  'Submenu stuff goes here' +
                '</pane>' +
              '</menu>';

      inject(function($compile, $rootScope) {
        scope = $rootScope;
        element = angular.element(html);
        compiled = $compile(element)(scope);
        scope.$digest();
      });
    });

    // Setup Controller
    var ctrl;
    beforeEach(inject(function($controller) {
      ctrl = $controller(menuController, {$scope: scope, $element: null});
    }));

    it('Should add panes', inject(function($controller, $rootScope) {
      var pane1 = {}, pane2 = {};

      // There should be no panes when we start
      expect(scope.panes).toEqual([]);

      // Add two panes
      ctrl.addPane(pane1);
      ctrl.addPane(pane2);

      // There should be 2 panes when we finish
      expect(scope.panes.length).toEqual(2);
    }));
    
    it('Should start with no panes selected', inject(function($controller, $rootScope) {
      // Test impact on DOM
      var test = element.find('.active'); // We indicate an active pane by setting a class .active
      var result = {};  // There should be no active panes

      console.log(element);

      expect(JSON.stringify(test)).toEqual(JSON.stringify(result));

      // Test actual Contoller with stub data
      var pane1 = {}, pane2 = {};

      ctrl.addPane(pane1);
      ctrl.addPane(pane2);

      angular.forEach(scope.panes, function(pane) {
        expect(pane.selected).toEqual(null);
      });
    }));
    it('Should select a single pane when clicked if no panes are selected', function() {
      
    });
    it('Should de-select the current pane when clicked if the current pane is selected', function() {

    });

    it('Should select the current pane when clicked and de-select the other pane if another pane is selected', function() {

    });

  });
});