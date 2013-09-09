// jasmine matcher for expecting an element to have a css class
// from: https://github.com/vojtajina/ng-directive-testing/blob/master/test/helpers.js
beforeEach(function() {
  this.addMatchers({
    toHaveClass: function(cls) {
      this.message = function() {
        return "Expected '" + angular.mock.dump(this.actual) + "' to have class '" + cls + "'.";
      };

      return this.actual.hasClass(cls);
    }
  });
});