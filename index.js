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

  var stream = new Stream.Readable();

  if (opts.requireJs) {
    stream.push("define(['jade'], function(jade) {\n");
  }

  // String which will eventually be written as a JS file
  stream.push("var JST = {};\n");

  through.obj(function(file, encoding, callback) {
    if (file.isNull()) {
      return;
    }

    if (file.isBuffer()) {
      return callback(
        new gulp_util.PluginError(
          "gulp-jade-client", "Buffers not supported"
        )
      );
    }

    if (file.isStream()) {
      return jade_client.generate(file, opts, function(error, generated) {
        if (error) {
          return callback(
            new gulp_util.PluginError(
              "gulp-jade-client", ("Generation error: " + error)
            )
          );
        }

        stream.push(generated);
      });
    }

    return;
  });

  if (opts.requireJs) {
    stream.push("return JST;\n" + "});\n");
  }

  return stream;
};
