/*
 * gulp-jade-client
 * Based on two-n/grunt-jade-client
 *
 * Copyright 2016, Valerian Saliou
 * Author: Valerian Saliou <valerian@valeriansaliou.name>
 */


"use strict";


var gulp_util  = require("gulp-util");
var through    = require("through2");


module.exports = function(opts) {
  opts = opts || {};

  return through.obj(function(file, encoding, callback) {
    if (file.isNull()) {
      return callback(null, file);
    }

    if (file.isBuffer()) {
      return callback(
        new gulp_util.PluginError(
          "gulp-jade-client", "Buffers not supported"
        )
      );
    }

    if (file.isStream()) {
      // TODO
      var streamer = null; //remove_logging.proceed(file, opts);

      streamer.on(
        "error", this.emit.bind(this, "error")
      );

      file.contents = file.contents.pipe(streamer);
    }

    return callback(null, file);
  });
};
