/*
 * gulp-jade-client
 * Based on two-n/grunt-jade-client
 *
 * Copyright 2016, Valerian Saliou
 * Author: Valerian Saliou <valerian@valeriansaliou.name>
 */


"use strict";


var fs                = require("fs");
var path              = require("path");
var assert            = require("assert");
var File              = require("vinyl");
var gulp_jade_client  = require("..");


describe("gulp-jade-client", function() {
  // Fixtures
  var referenceTestDate = {
    "hello" : [
      {
        name    : "hello_world.jade",
        content : "h1 Hello World"
      },

      {
        name    : "bonjour_le_monde.jade",
        content : "h1 Bonjour Le Monde"
      },

      {
        name    : "hola_mundo.jade",
        content : "h1 Hola Mundo"
      }
    ]
  };

  // Helpers
  var testJadeClientGeneric = function(filename, source, expected, options) {
    return function(done) {
      var reference_output_file = fs.readFileSync(
        path.join(__dirname, "./expected/" + expected + ".js")
      );

      // Pass reference data to Jade client module
      var jade_client = gulp_jade_client(filename, options);

      source.forEach(function(source_object) {
        jade_client.write(
          new File({
            name     : source_object.name,
            path     : path.join(__dirname, ("./" + source_object.name)),
            base     : __dirname,
            contents : new Buffer(source_object.content)
          })
        );
      });

      // Check output data is valid
      jade_client.once("data", function(file) {
        // Make sure it still comes out as buffer.
        assert(
          file.isBuffer(), "Output should be a buffer file"
        );

        // Check file contents
        assert.equal(
          file.contents.toString(), reference_output_file.toString(),
          "Should match reference output file"
        );

        done();
      });

      jade_client.once("error", function(error) {
        return done(
          error || (new Error("Broken pipeline"))
        );
      });

      jade_client.end();
    };
  };

  // Tests
  it(
    "should compile Jade template without requireJs",

    testJadeClientGeneric(
      "hello.js", referenceTestDate.hello, "hello_no_requirejs", {}
    )
  );

  it(
    "should compile Jade template with requireJs",

    testJadeClientGeneric(
      "hello.js", referenceTestDate.hello, "hello_with_requirejs", {
        requireJs : true
      }
    )
  );
});
