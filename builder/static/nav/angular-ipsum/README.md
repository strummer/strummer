angular-ipsum
=============

Override your content with Lorem Ipsum when designing


# Installation

Place ipsum.js into a folder (or subfolder) in your AngularJS project


# Usage

Add the following lines to any modules (in this case, nav) whose output you want to override:

```
nav.config(function($httpProvider) {
  $httpProvider.responseInterceptors.push('ipsumInterceptor');
});
```

Any JSON you pass in will be processed by angular-ipsum.


## Specifying which Ipsum to use

**angular-ipsum** uses Hipster Ipsum() by default.

If you want to use another ipsum, you can override it by setting the variable `$rootScope.ipsum` in your module's `.run`. 

For example:
```
nav.run(function($rootScope) {
    $rootScope.ipsum = 'hipster';
});
```

Current 

Support for:
- [x] Strings
- [x] Numbers
- [ ] Images
- [ ] Paragraphs
