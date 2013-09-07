# Module Organization

Angular devs suggest modules be `grouped by function <http://henriquat.re/modularizing-angularjs/modularizing-angular-applications/modularizing-angular-applications.html>`_ (nav, menu), rather than type (model, controller).

Inside static, you'll find a folder for each angular module.

The **`./builder`** directory houses the main application javascript which loads all subsequent modules via dependency injection.