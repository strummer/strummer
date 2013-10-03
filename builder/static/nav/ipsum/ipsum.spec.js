/* Tests for ipsum.js */

//beforeEach(module('ipsum'));
beforeEach(module('testModule'));

// Fake module to enable Interceptor config
var testModule = angular.module('testModule', ['ipsum']).
  config(function($httpProvider) {
    $httpProvider.responseInterceptors.push('ipsumInterceptor');
  });

describe("factory: ipsumInterceptor", function() {
    var scope;

    // Setup http mocks for remote http calls
    beforeEach(inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when("GET", "static/nav/settings/settings.json")
            .respond(
              {
                domain: "www.strummer.io",
                id: 1,
                object: {}
              }, {"content-type": "application/json"});
        $httpBackend.when("GET", "static/nav/settings/settings")
            .respond("settings go here");
    }));

    it("Should be defined", inject(function($rootScope, ipsumInterceptor) {
      expect(ipsumInterceptor).toBeDefined();
    }));

    it("Should not affect non-JSON data", inject(function($http, $rootScope, ipsumInterceptor) {
      var expectedSettings = "settings go here";

      $http.get('static/nav/settings/settings').success(function(data) {
        expect(data).toEqual(expectedSettings);
      });
      $httpBackend.flush(); // Needed to cause above $http.get to trigger
    }));

    it("Should affect JSON data", inject(function($http, $rootScope, ipsumInterceptor) {
      var expectedDomain = "asjdklfajflkasjlf;jak;fjas";  // Default string override until I get real lorem ipsum content

      $http.get('static/nav/settings/settings.json').success(function(data, response, test) {
        expect(data.domain).toEqual(expectedDomain);
      });
      $httpBackend.flush(); // Needed to cause above $http.get to trigger
    }));

    it("Should process strings", inject(function($http, $rootScope, ipsumInterceptor) {
      var expectedDomain = "asjdklfajflkasjlf;jak;fjas";  // Default string override until I get real lorem ipsum content

      $http.get('static/nav/settings/settings.json').success(function(data, response, test) {
        expect(data.domain).toEqual(expectedDomain);
      });
      $httpBackend.flush(); // Needed to cause above $http.get to trigger
    }));

    it("Should process numbers", inject(function($http, $rootScope, ipsumInterceptor) {
      var expectedId = 18723489712987498.35;  // Default string override until I get real lorem ipsum content

      $http.get('static/nav/settings/settings.json').success(function(data, response, test) {
        expect(data.id).toEqual(expectedId);
      });
      $httpBackend.flush(); // Needed to cause above $http.get to trigger
    }));

    it("Should affect unknown data", inject(function($http, $rootScope, ipsumInterceptor) {
      var expectedObject = "???";  // Default string override until I get real lorem ipsum content

      $http.get('static/nav/settings/settings.json').success(function(data, response, test) {
        expect(data.object).toEqual(expectedObject);
      });
      $httpBackend.flush(); // Needed to cause above $http.get to trigger
    }));

});
