Contributing to Builder
-----------------------

# Installation

For basic installation, see the [Builder README](../README.md).


# Install testing dependencies (optional)

Once you start developing for Builder, you'll want to be able to 
write, compile, and run tests to ensure that your code works.

We use [Karma](http://karma-runner.github.io/0.10/index.html) (recommended by AngularJS) for our test suite.

1. Open your terminal
2. Install Karma globally: `sudo npm install -g karma`


# Running tests

There are a variety of ways to run tests while working. Here's how we do it:

The `karma start` command will run your tests and watch your project for any changes, re-running tests any time a .js file changes.

```
$ karma start
INFO [karma]: Karma v0.10.2 server started at http://localhost:9876/
INFO [launcher]: Starting browser Chrome
INFO [Chrome 29.0.1547 (Mac OS X 10.8.5)]: Connected on socket QvMiS8huMXSvTLca4wQE
.............
Chrome 29.0.1547 (Mac OS X 10.8.5): Executed 13 of 13 SUCCESS (0.404 secs / 0.108 secs)
```

Karma's settings are stored in [karma.conf.js](../karma.conf.js), in case you're running into problems.

Tests will be expected to build against the project's [karma.conf.js](../karma.conf.js) so please issue a [pull request](https://help.github.com/articles/using-pull-requests) if you make any changes.

If you run into problems, see the **FAQ** below for common problems and fixes.


# Starting Builder

Once you've confirmed that the test suite works properly on your machine, it's time to load up Builder!

You can run Builder on any server of your choosing. We currently use [simple-server](https://github.com/balupton/simple-server), a NodeJS server that serves static files.

Feel free to use a server of your choosing.

If you're using simple-server, you can run the following command from the base `builder` directory:
```
$ simple-server .
```

Builder will be available at: http://localhost:3000/



# FAQ

## Help, I get an error when I try to run `karma start`!

**Error**
```
WARN [preprocess]: Can not load "ng-html2js", it is not registered!
Perhaps you are missing some plugin?"
```

**Solution**
You need to run `npm install` from the builder directory. This will install the additional test dependencies that we use fron npm


**Error (Mac OSX)**
```
ERROR [launcher]: Cannot start Chrome
  Can not find the binary /Applications/Google Chrome.app/Contents/MacOS/Google Chrome
  Please set env variable CHROME_BIN
```

**Solution**
Karma can't locate your Chrome executable. 

Make sure you have Chrome installed, then set an environment variable to let Karma know where it's located.

For example, you can add the following to your `~/.profile` file:
```
export CHROME_BIN="/Applications/Chrome.app/Contents/MacOS/Google Chrome"
```

After saving the file, run `source ~/.profile` to reload the file and try runnign Karma again.



## Can't find the answer to your question?

If you don't see the answer to your problem, please [Submit an Issue](https://github.com/strummer/strummer/issues/new) and we'll do our best to help you!