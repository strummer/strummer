# Module Organization

Angular devs suggest modules be [grouped by function](http://henriquat.re/modularizing-angularjs/modularizing-angular-applications/modularizing-angular-applications.html) (nav, menu), rather than type (model, controller).

Inside static, you'll find a folder for each angular module.

## Main Application Module

The **`./builder`** directory houses the main application javascript which loads all subsequent modules via dependency injection.


## Structure of a Module folder

Inside each module folder you will find all relevant files pertaining to the module.

This could include:
* Javascript
* CSS
* HTML/Templates
* Images

The folder, module name, main .css, and main .js file for a module should all be the same.

Modules or files with multiple names should contain underscores for spaces.

For example:
````
./nav
  |_ nav.js
  |_ nav.css
  |_ nav_header.html
  |_ nav_subnav.html
````
