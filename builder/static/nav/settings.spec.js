/* Tests for settings.js */

beforeEach(module('settings'));

beforeEach(module('static/nav/settings.html')); // Need to initialize templates


describe("directive: settings", function() {
    var scope;

    // Setup DOM
    var html, element, compiled;
    beforeEach(function() {
        html = '' +
        '<settings></settings>' +
        
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
        ctrl = $controller('settingsController', {$scope: scope, $element: null});
    }));

    
    it("Should retrieve the domain from the datastore", inject(function($controller, $rootScope) {
        expect(scope.domain).toBeDefined();
    }));
    
    it("Should display an empty domain by default", inject(function($controller, $rootScope) {
        expect(scope.domain).toEqual('');
    }));

    it("Should display the user's domain if a domain exists", inject(function($controller, $rootScope) {
    }));

    it("Should save the user's domain when the user clicks 'Save'", inject(function($controller, $rootScope) {
    }));

    it("Should display an error if the domain cannot be saved", inject(function($controller, $rootScope) {
    }));

});

describe("factory: domainFactory", function() {

});
