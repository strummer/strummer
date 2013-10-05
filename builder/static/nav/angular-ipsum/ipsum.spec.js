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

    // Initialization

    it("Should be defined", inject(function($rootScope, ipsumInterceptor) {
      expect(ipsumInterceptor).toBeDefined();
    }));

    it("Should be initialized", inject(function($rootScope, ipsumInterceptor) {
      expect($rootScope.ipsum).toBeDefined();
      expect($rootScope.ipsum.initialized).toBeDefined();
      expect($rootScope.ipsum.initialized).toBeTruthy();
    }));

    // Config

    it("Should use hipster 'language' by default", inject(function($rootScope, ipsumInterceptor) {
      var expectedLanguage = 'hipster';

      expect($rootScope.ipsum.language).toEqual(expectedLanguage);
    }));

    it("Should allow a user to override the language", inject(function($rootScope, ipsumInterceptor) {
      var expectedLanguage = 'bill-and-ted';

      // Not sure how to test this yet
      /* testModule.run(function($rootScope) {
        console.log("got here");
        $rootScope.ipsum = {
        language: "hipster1"
        };
      });

      expect($rootScope.ipsum.language).toEqual(expectedLanguage); */
    }));

    it("Should be disabled by default", inject(function($http, $rootScope, ipsumInterceptor) {
      expectedDomain = "www.strummer.io";

      expect($rootScope.ipsum.enabled).toBeUndefined();

      $http.get('static/nav/settings/settings.json').success(function(data) {
        expect(data.domain).toEqual(expectedDomain);
      });
      $httpBackend.flush(); // Needed to cause above $http.get to trigger
    }));

    it("Should allow the user to enable ipsum", inject(function($http, $rootScope, ipsumInterceptor) {
      var expectedDomain = "Ad dolore drinking vinegar, 3 wolf moon Marfa quis viral bitters post-ironic. Truffaut voluptate mlkshk nisi, sed Etsy mixtape bicycle rights fanny pack gluten-free. Plaid flannel exercitation, leggings bespoke excepteur sint ex quinoa Intelligentsia. Mumblecore occaecat deep v, in ad next level commodo. Carles pour-over beard butcher, pickled consequat kogi sint narwhal non nihil laboris blog kitsch reprehenderit. Next level 8-bit you probably haven't heard of them vero labore, pop-up pariatur assumenda sartorial. Reprehenderit fixie gluten-free Godard shabby chic gentrify." +
        "Elit mollit nesciunt four loko, Terry Richardson Helvetica Schlitz ullamco McSweeney's gentrify ugh proident. Ullamco distillery lomo wolf. Slow-carb fap Bushwick you probably haven't heard of them ethical. Lomo eiusmod Cosby sweater, occupy flannel VHS placeat. Sartorial bitters cupidatat, elit consectetur pickled sapiente synth Austin disrupt. Proident Truffaut leggings wolf, deep v readymade actually. Cliche literally farm-to-table in, accusamus kitsch vero wolf 90's." +
        "Ugh Cosby sweater fingerstache, assumenda Schlitz literally id PBR vinyl actually. Semiotics PBR&B umami mustache cardigan cliche. Biodiesel Williamsburg Shoreditch squid whatever McSweeney's salvia. Trust fund keytar officia viral pork belly art party. Esse fixie shabby chic kogi, sapiente kitsch nihil veniam slow-carb keytar Echo Park squid. Next level squid direct trade lo-fi put a bird on it. Flexitarian chia 3 wolf moon Helvetica Banksy." +
        "Keffiyeh velit artisan gastropub, adipisicing art party salvia accusamus butcher Blue Bottle High Life ea. Culpa artisan skateboard gluten-free. IPhone locavore before they sold out small batch ethnic selfies. Sustainable photo booth Portland Williamsburg, nihil keffiyeh try-hard wayfarers Banksy skateboard excepteur incididunt Pinterest minim. Butcher keytar tofu, est incididunt skateboard retro delectus chambray laboris wolf forage wayfarers Terry Richardson. 90's chillwave exercitation Odd Future. Tattooed locavore master cleanse seitan selvage.";

      expect($rootScope.ipsum.enabled).toBeUndefined();

      $rootScope.ipsum.enabled = true;

      $http.get('static/nav/settings/settings.json').success(function(data) {
        expect(data.domain).toEqual(expectedDomain);
      });
      $httpBackend.flush(); // Needed to cause above $http.get to trigger
    }));

    // Functionality

    it("Should not affect non-JSON data", inject(function($http, $rootScope, ipsumInterceptor) {
      var expectedSettings = "settings go here";
      $rootScope.ipsum.enabled = true;

      $http.get('static/nav/settings/settings').success(function(data) {
        expect(data).toEqual(expectedSettings);
      });
      $httpBackend.flush(); // Needed to cause above $http.get to trigger
    }));

    it("Should affect JSON data", inject(function($http, $rootScope, ipsumInterceptor) {
      var expectedDomain = "Ad dolore drinking vinegar, 3 wolf moon Marfa quis viral bitters post-ironic. Truffaut voluptate mlkshk nisi, sed Etsy mixtape bicycle rights fanny pack gluten-free. Plaid flannel exercitation, leggings bespoke excepteur sint ex quinoa Intelligentsia. Mumblecore occaecat deep v, in ad next level commodo. Carles pour-over beard butcher, pickled consequat kogi sint narwhal non nihil laboris blog kitsch reprehenderit. Next level 8-bit you probably haven't heard of them vero labore, pop-up pariatur assumenda sartorial. Reprehenderit fixie gluten-free Godard shabby chic gentrify." +
        "Elit mollit nesciunt four loko, Terry Richardson Helvetica Schlitz ullamco McSweeney's gentrify ugh proident. Ullamco distillery lomo wolf. Slow-carb fap Bushwick you probably haven't heard of them ethical. Lomo eiusmod Cosby sweater, occupy flannel VHS placeat. Sartorial bitters cupidatat, elit consectetur pickled sapiente synth Austin disrupt. Proident Truffaut leggings wolf, deep v readymade actually. Cliche literally farm-to-table in, accusamus kitsch vero wolf 90's." +
        "Ugh Cosby sweater fingerstache, assumenda Schlitz literally id PBR vinyl actually. Semiotics PBR&B umami mustache cardigan cliche. Biodiesel Williamsburg Shoreditch squid whatever McSweeney's salvia. Trust fund keytar officia viral pork belly art party. Esse fixie shabby chic kogi, sapiente kitsch nihil veniam slow-carb keytar Echo Park squid. Next level squid direct trade lo-fi put a bird on it. Flexitarian chia 3 wolf moon Helvetica Banksy." +
        "Keffiyeh velit artisan gastropub, adipisicing art party salvia accusamus butcher Blue Bottle High Life ea. Culpa artisan skateboard gluten-free. IPhone locavore before they sold out small batch ethnic selfies. Sustainable photo booth Portland Williamsburg, nihil keffiyeh try-hard wayfarers Banksy skateboard excepteur incididunt Pinterest minim. Butcher keytar tofu, est incididunt skateboard retro delectus chambray laboris wolf forage wayfarers Terry Richardson. 90's chillwave exercitation Odd Future. Tattooed locavore master cleanse seitan selvage.";
      
      $rootScope.ipsum.enabled = true;

      $http.get('static/nav/settings/settings.json').success(function(data, response, test) {
        expect(data.domain).toEqual(expectedDomain);
      });
      $httpBackend.flush(); // Needed to cause above $http.get to trigger
    }));

    it("Should process strings", inject(function($http, $rootScope, ipsumInterceptor) {
      var expectedDomain = "Ad dolore drinking vinegar, 3 wolf moon Marfa quis viral bitters post-ironic. Truffaut voluptate mlkshk nisi, sed Etsy mixtape bicycle rights fanny pack gluten-free. Plaid flannel exercitation, leggings bespoke excepteur sint ex quinoa Intelligentsia. Mumblecore occaecat deep v, in ad next level commodo. Carles pour-over beard butcher, pickled consequat kogi sint narwhal non nihil laboris blog kitsch reprehenderit. Next level 8-bit you probably haven't heard of them vero labore, pop-up pariatur assumenda sartorial. Reprehenderit fixie gluten-free Godard shabby chic gentrify." +
        "Elit mollit nesciunt four loko, Terry Richardson Helvetica Schlitz ullamco McSweeney's gentrify ugh proident. Ullamco distillery lomo wolf. Slow-carb fap Bushwick you probably haven't heard of them ethical. Lomo eiusmod Cosby sweater, occupy flannel VHS placeat. Sartorial bitters cupidatat, elit consectetur pickled sapiente synth Austin disrupt. Proident Truffaut leggings wolf, deep v readymade actually. Cliche literally farm-to-table in, accusamus kitsch vero wolf 90's." +
        "Ugh Cosby sweater fingerstache, assumenda Schlitz literally id PBR vinyl actually. Semiotics PBR&B umami mustache cardigan cliche. Biodiesel Williamsburg Shoreditch squid whatever McSweeney's salvia. Trust fund keytar officia viral pork belly art party. Esse fixie shabby chic kogi, sapiente kitsch nihil veniam slow-carb keytar Echo Park squid. Next level squid direct trade lo-fi put a bird on it. Flexitarian chia 3 wolf moon Helvetica Banksy." +
        "Keffiyeh velit artisan gastropub, adipisicing art party salvia accusamus butcher Blue Bottle High Life ea. Culpa artisan skateboard gluten-free. IPhone locavore before they sold out small batch ethnic selfies. Sustainable photo booth Portland Williamsburg, nihil keffiyeh try-hard wayfarers Banksy skateboard excepteur incididunt Pinterest minim. Butcher keytar tofu, est incididunt skateboard retro delectus chambray laboris wolf forage wayfarers Terry Richardson. 90's chillwave exercitation Odd Future. Tattooed locavore master cleanse seitan selvage.";

      $rootScope.ipsum.enabled = true;

      $http.get('static/nav/settings/settings.json').success(function(data, response, test) {
        expect(data.domain).toEqual(expectedDomain);
      });
      $httpBackend.flush(); // Needed to cause above $http.get to trigger
    }));

    it("Should process numbers", inject(function($http, $rootScope, ipsumInterceptor) {
      var expectedId = 909303808411;  // Default string override until I get real lorem ipsum content

      $rootScope.ipsum.enabled = true;

      $http.get('static/nav/settings/settings.json').success(function(data, response, test) {
        expect(data.id).toEqual(expectedId);
      });
      $httpBackend.flush(); // Needed to cause above $http.get to trigger
    }));

    it("Should affect unknown data", inject(function($http, $rootScope, ipsumInterceptor) {
      var expectedObject = "???";  // Default string override until I get real lorem ipsum content

      $rootScope.ipsum.enabled = true;

      $http.get('static/nav/settings/settings.json').success(function(data, response, test) {
        expect(data.object).toEqual(expectedObject);
      });
      $httpBackend.flush(); // Needed to cause above $http.get to trigger
    }));

});
