/* Tests for settings.js */

beforeEach(module('firebase', 'settings'));

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

        /*
        beforeEach(module(function($provide) {
            $provide.value('Firebase', firebaseStub());
            $provide.value('angularFireAuth', angularAuthStub());
        }));
*/

        beforeEach(inject(function($controller) {
            ctrl = $controller('settingsController', {$scope: scope, $element: null});
        }));

        
        it("Should retrieve the domain from the datastore", inject(function($controller, $rootScope, angularFire) {

            // Stub fake response from firebase
            // Verify that 'domain' has changed
            console.log(scope.domain);
            expect(true).toBeTruthy();

        }));
        
        it("Should display an error if the domain cannot be retrieved from the datastore", inject(function($controller, $rootScope) {
        }));

        it("Should display an empty domain if no domain exists", inject(function($controller, $rootScope) {
            // Stub fake response from angularFire server with empty domain name
            // Mock angularFire module so request goes to our server  
            
            expect(scope.domain).toEqual('');
        }));

        it("Should display the user's domain if a domain exists", inject(function($controller, $rootScope) {

        }));

        it("Should save the user's domain when the user clicks 'Save'", inject(function($controller, $rootScope) {
        }));

        it("Should display an error if the domain cannot be saved", inject(function($controller, $rootScope) {
        }));

    });