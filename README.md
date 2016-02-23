# gulp-jade-client

[![Build Status](https://img.shields.io/travis/valeriansaliou/gulp-jade-client/master.svg)](https://travis-ci.org/valeriansaliou/gulp-jade-client) [![Test Coverage](https://img.shields.io/coveralls/valeriansaliou/gulp-jade-client/master.svg)](https://coveralls.io/github/valeriansaliou/gulp-jade-client?branch=master) [![NPM](https://img.shields.io/npm/v/gulp-jade-client.svg)](https://www.npmjs.com/package/gulp-jade-client) [![Downloads](https://img.shields.io/npm/dt/gulp-jade-client.svg)](https://www.npmjs.com/package/gulp-jade-client) [![Gitter](https://img.shields.io/gitter/room/valeriansaliou/gulp-jade-client.svg)](https://gitter.im/valeriansaliou/gulp-jade-client)

Compiles Jade templates from the browser. Allows you to develop Jade-powered frontend apps, which render templates client-side (you can pass template data in the client, eg: browser).

This plugin is based on the initial work of [@two-n](https://github.com/two-n) on [grunt-jade-client](https://github.com/two-n/grunt-jade-client).

## Getting Started

Install this plugin with the command:

```javascript
npm install gulp-jade-client
```

Next, add this line to your gulpfile:

```javascript
var gulp_jade_client = require("gulp-jade-client");
```

Lastly, add the configuration settings (see below) to your gulpfile.

## Task Configuration

### Options

#### container

Type: `String`
Default value: `JadeClient`

Change it to specify another JavaScript container object, which will be used to store and access your templates.

#### requireJs

Type: `Boolean`
Default value: `false`

If set to true, then the output file will be a requireJs module.

### Usage Examples

#### Default Options

In this example, we build a single js file called `templates.js`, which has the result of input compiled Jade templates. In our JavaScript, we can then get the output of the 'hello.jade' template with `JadeClient['hello']` (`JadeClient` is the default container, but you can change that).

```javascript
gulp.task("jade_client", function() {
  return gulp.src("src/templates/**/*.jade")
    .pipe(
      gulp_jade_client("templates.js", {
        // Options (optional)
        // eg:
        // container: "JadeClient",
        // requireJs: true
      })
    )
    .pipe(
      gulp.dest(
        "build/javascripts"
      )
    );
});
```

#### In the Browser

Make sure that you have included your compiled template file, as well as runtime.js (copy of the file is on this repo for convenience).  Note that there is another module which builds this dependency into the output file, [clientjade](https://github.com/jgallen23/clientjade).

The following code (using jQuery) will render the "hello" template into #target.
````js
$("#target").html(JadeClient["hello"]);
````
