/*
 * gulp-jade-client
 * Based on two-n/grunt-jade-client
 *
 * Copyright 2016, Valerian Saliou
 * Author: Valerian Saliou <valerian@valeriansaliou.name>
 */


"use strict";


var gulp_util    = require("gulp-util");
var through      = require("through2");
var Stream       = require("stream");

var jade_client  = require("./lib/jade_client");


module.exports = function(opts) {
  opts = opts || {};

  // Default opts
  if (!("requireJs" in opts)) {
    opts.requireJs = false;
  }

  var is_first = true,
      is_last  = false;

  return through.obj(function(file, encoding, callback) {
    var self = this;

    if (file.isNull()) {
      return callback();
    }

    if (file.isBuffer()) {
      return callback(
        new gulp_util.PluginError(
          "gulp-jade-client", "Buffers not supported"
        )
      );
    }

    if (file.isStream()) {
      if (is_first === true) {
        is_first = false;

        if (opts.requireJs) {
          self.push("define(['jade'], function(jade) {\n");
        }

        // String which will eventually be written as a JS file
        self.push("var JST = {};\n");
      }

      jade_client.generate(file, opts, function(error, generated) {
        if (error) {
          return callback(
            new gulp_util.PluginError(
              "gulp-jade-client", ("Generation error: " + error)
            )
          );
        }

        self.push(generated);

        if (is_last === true) {
          is_last = false;

          if (opts.requireJs) {
            self.push("return JST;\n" + "});\n");
          }
        }

        return callback();
      });

      return;
    }

    return callback();
  });
};
