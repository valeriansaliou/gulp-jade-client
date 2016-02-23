/*
 * gulp-jade-client
 * Based on two-n/grunt-jade-client
 *
 * Copyright 2016, Valerian Saliou
 * Author: Valerian Saliou <valerian@valeriansaliou.name>
 */


"use strict";


var path          = require("path");

var gulp_util     = require("gulp-util");
var through       = require("through2");
var event_stream  = require("event-stream");

var jade_client   = require("./lib/jade_client");


module.exports = function(filename, opts) {
  opts = opts || {};

  // Default opts
  if (!("requireJs" in opts)) {
    opts.requireJs = false;
  }

  var latest_file, latest_mod,
      generated = [];

  return through.obj(function(file, encoding, callback) {
    // Validate filename
    if (!filename || typeof filename !== "string") {
      this.emit(
        "error",

        new gulp_util.PluginError(
          "gulp-jade-client", "Target filename missing"
        )
      );

      return;
    }

    // Ignore empty files
    if (file.isNull()) {
      callback();

      return;
    }

    // We dont do streams (yet)
    if (file.isStream()) {
      this.emit(
        "error",
        new gulp_util.PluginError("gulp-jade-client", "Streams not supported")
      );
    }

    if (file.isBuffer()) {
      try {
        generated.push(
          jade_client.generate(file, opts).toBuffer()
        );
      } catch (error) {
        this.emit(
          "error", new gulp_util.PluginError("gulp-jade-client", error)
        );
      }

      if (!latest_mod || file.stat && (file.stat.mtime > latest_mod)) {
        latest_file = file;
        latest_mod  = (file.stat && file.stat.mtime);
      }
    }

    callback();
  }, function(callback) {
    // Encapsulate JST code lines
    generated.unshift("var JST = {};\n");

    if (opts.requireJs) {
      // Is inserted BEFORE the JST variable declaration
      generated.unshift("define(['jade'], function(jade) {\n");

      // Is inserted at the very-end
      generated.push("return JST;\n" + "});\n");
    }

    var generated_file = latest_file.clone({
      contents : false
    });

    generated_file.path     = path.join(latest_file.base, filename);
    generated_file.contents = event_stream.readArray(generated);

    this.push(generated_file);

    callback();
  });
};
