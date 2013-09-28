/* Tests for nav.js */

describe("nav", function() {

    beforeEach(module('nav'));

    // We have to load the templates in advance, otherwise the browser tries to fetch them dynamically which causes tests to fail.
    // Reference: https://github.com/vojtajina/ng-directive-testing
    beforeEach(module('static/nav/menu.html', 'static/nav/pane.html'));

    describe("directive: menu", function() {
        var scope;

        // Setup DOM
        var html, element, compiled;
        beforeEach(function() {
            html = '' +
            '<menu>' +
                '<pane title="pane1" symbol="#">' +
                    'pane1 contents goes here' +
                '</pane>' +
                '<pane title="pane2" symbol="@">' +
                    'pane2 contents goes here' +
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

        it("Should add panes", inject(function($controller, $rootScope) {
            // Test Contoller with stub data
            var pane1 = {}, pane2 = {};

            // There should be no panes when we start
            expect(scope.panes).toEqual([]);

            // Add two panes
            ctrl.addPane(pane1);
            ctrl.addPane(pane2);

            // There should be 2 panes when we finish
            expect(scope.panes.length).toEqual(2);
        }));
        
        it("Should start with no panes selected", inject(function($controller, $rootScope) {
            // Test impact on DOM
            var test = element.find('.active'); // We indicate an active pane by setting a class .active

            expect(test.length).toEqual(0); // There should be no active (selected) panes

            // Test Contoller
            var pane1 = {}, pane2 = {};

            ctrl.addPane(pane1);
            ctrl.addPane(pane2);

            angular.forEach(scope.panes, function(pane) {
                expect(pane.selected).toEqual(null);
            });
        }));

        it("Should select a single pane when clicked if no panes are selected", function() {
            // Test DOM
            buttons = element.find('.button');
            expect(buttons.length).toEqual(2);

            buttons.eq(0).find('a').click();

            active = element.find('.active');
            expect(active.length).toEqual(2);   // We should have two active (selected) objects: The button and the pane
            
            pane = active[0];
            expect(pane.className).toContain('pane1');

            button = active[1];
            expect(button.title).toEqual('pane1');

            // Test Controller
            var pane1 = {}, pane2 = {};

            ctrl.addPane(pane1);
            ctrl.addPane(pane2);

            scope.toggle(pane1);
            expect(pane1.selected).toBeTruthy();
            expect(pane2.selected).toBeFalsy();
        });
        
        it("Should de-select the current pane when clicked if the current pane is selected", function() {
            // Test DOM
            buttons = element.find('.button');

            buttons.eq(0).find('a').click();
            buttons.eq(0).find('a').click();

            active = element.find('.active');
            expect(active.length).toEqual(0);   // We should not have any active (selected) objects

            // Test Controller
            var pane1 = {}, pane2 = {};

            ctrl.addPane(pane1);
            ctrl.addPane(pane2);

            scope.toggle(pane1);
            scope.toggle(pane1);
            expect(pane1.selected).toBeFalsy();
        });

        it("Should select the current pane when clicked and de-select the other pane if another pane is selected", function() {
            // Test DOM
            buttons = element.find('.button');

            buttons.eq(0).find('a').click();
            buttons.eq(1).find('a').click();

            active = element.find('.active');
            expect(active.length).toEqual(2);   // We should have two active (selected) objects: The button and the pane

            pane = active[0];
            expect(pane.className).toContain('pane2');

            button = active[1];
            expect(button.title).toEqual('pane2');

            // Test Controller
            var pane1 = {}, pane2 = {};

            ctrl.addPane(pane1);
            ctrl.addPane(pane2);

            scope.toggle(pane1);
            scope.toggle(pane2);
            expect(pane1.selected).toBeFalsy();
            expect(pane2.selected).toBeTruthy();
        });

    });

});