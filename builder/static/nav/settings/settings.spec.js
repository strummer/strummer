/* Tests for settings.js */

beforeEach(module('settings'));

beforeEach(module('static/nav/settings/settings.html')); // Need to initialize templates


describe("directive: settings", function() {
    var scope;

    // Setup http mocks for remote http calls
    beforeEach(inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when("GET", "static/nav/settings/settings.json")
            .respond({domain:"www.strummer.io"});
    }));

    // Setup DOM
    var html, element, compiled;
    beforeEach(function() {
        html = '' +
        '<settings></settings>';
        
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
        // Test Controller
        expect(scope.domain).toBeDefined();
    }));
    
    it("Should successfully initialize the datastore", inject(function($controller, $rootScope, domainFactory) {
        expect(domainFactory).toBeDefined();
    }));

    it("Should retrieve the domain from the datastore", inject(function($controller, $rootScope, domainFactory) {
        // Test DOM
        textField = element.find('input').eq(0);

        expect(textField.val()).toEqual('');

        // Test Controller
        domainFactory.get().success(function(data) {
            expect(scope.domain).toEqual(data);
        });
        
    }));


    it("Should set the domain when the user clicks 'Save'", inject(function($controller, $rootScope, domainFactory) {
        var expectedDomain = 'strummer.io';
        scope.domain = expectedDomain;

        scope.saveDomain();

        // Test Controller
        expect(scope.domain).toEqual(expectedDomain);

        domainFactory.get().success(function(data) {
            expect(domainFactory.get()).toEqual(expectedDomain);
        });
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

    // Setup http mocks for remote http calls
    beforeEach(inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when("GET", "static/nav/settings/settings.json")
            .respond({value:"goodValue"});
    }));

    it("Should have a variable to reference domains", inject(function() {
        var domain = domainFactory.get();
        expect(domain).toBeDefined();
    }));

    it("Should return an empty domain by default", inject(function() {
        var expectedDomain = "";
        var domain;

        domainFactory.get().success(function(data) {
            domain = data;
            expect(domain).toEqual(expectedDomain);
        });
    }));

    it("Should set the domain when a string is added", inject(function($controller, $rootScope) {
        var expectedDomain = "strummer.io";
        var domain;

        domainFactory.set(expectedDomain);

        domainFactory.get().success(function(data) {
            domain = data;
            expect(domain).toEqual(expectedDomain);
        });
    }));
});
