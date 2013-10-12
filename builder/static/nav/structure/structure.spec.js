/* Tests for structure.js */

beforeEach(module('structure'));

beforeEach(module('static/nav/structure/structure.html')); // Need to initialize templates

describe("directive: structure", function() {
    var scope;

    // Setup DOM
    var html, element, compiled;
    beforeEach(function() {
        html = '' +
        '<structure></structure>';
        
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
        ctrl = $controller('structureController', {$scope: scope, $element: null});
    }));

    it("Should keep track of a structure on the current scope", inject(function($controller, $rootScope, structureFactory) {
        // Test Controller
        expect(scope.structure).toBeDefined();
    }));
    
    it("Should successfully initialize the datastore", inject(function($controller, $rootScope, structureFactory) {
        expect(structureFactory).toBeDefined();
    }));

    it("Should retrieve the structure from the datastore", inject(function($controller, $rootScope, structureFactory) {
        // Test DOM

        // Test Controller
        expect(scope.structure).toEqual(structureFactory.get());
    }));
});

describe("factory: structureFactory", function() {

    beforeEach(function() {
        inject(function($injector) {
            structureFactory = $injector.get('structureFactory'); // Get an instance of structureFactory we can test
        });
    });

    it("Should have a variable to reference structures", inject(function() {
        var structure = structureFactory.get();
        expect(structure).toBeDefined();
    }));

    it("Should return an empty structure by default", inject(function() {
        var expectedStructure = [];
    
        var structure = structureFactory.get();

        expect(structure).toEqual(expectedStructure);
    }));

    it("Should update the structure when a node is passed in", inject(function($controller, $rootScope) {
        var expectedStructure = {
          name: "Comments",
          type: "list",
          children: []
        };
        structureFactory.set(expectedStructure);

        var structure = structureFactory.get();

        expect(structure).toEqual(expectedStructure);
    }));
});