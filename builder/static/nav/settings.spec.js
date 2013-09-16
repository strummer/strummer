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

    it("Should keep track of a domain on the current scope", inject(function($controller, $rootScope, domainFactory) {
        expect(scope.domain).toBeDefined();
    }));
    
    it("Should successfully initialize the datastore", inject(function($controller, $rootScope, domainFactory) {
        expect(domainFactory).toBeDefined();
    }));

    it("Should synchronize the with the datastore", inject(function($controller, $rootScope, domainFactory) {
        /* expect(scope.domain).toEqual(domainFactory.get());
        console.log(scope.domainFactory);

        var expectedDomain = 'strummer.io';
        domainFactory.set(expectedDomain);
        console.log("changed it");
        expect(scope.domain).toEqual(expectedDomain); */
    }));
    
    it("Should set the domain in the datastore", inject(function($controller, $rootScope) {
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

    beforeEach(function() {
        inject(function($injector) {
            domainFactory = $injector.get('domainFactory'); // Get an instance of domainFactory we can test
        });
    });

    it("Should have a variable to reference domains", inject(function() {
        var domain = domainFactory.get();
        expect(domain).toBeDefined();
    }));

    it("Should return an empty domain by default", inject(function() {
        var expectedDomain = "";
        var domain = domainFactory.get();

        expect(domain).toEqual(expectedDomain);
    }));

    it("Should set the domain when a string is added", inject(function($controller, $rootScope) {
        var expectedDomain = "strummer.io";
        domainFactory.set(expectedDomain);

        var domain = domainFactory.get();

        expect(domain).toEqual(expectedDomain);
    }));
});
