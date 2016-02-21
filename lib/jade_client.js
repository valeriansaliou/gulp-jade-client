/*
 * gulp-jade-client
 * Based on two-n/grunt-jade-client
 *
 * Copyright 2016, Valerian Saliou
 * Author: Valerian Saliou <valerian@valeriansaliou.name>
 */


"use strict";


var path          = require("path");

var event_stream  = require("event-stream");
var jade          = require("jade");


exports.generate = function(file, opts, fn_generated) {
  file.contents.pipe(
    event_stream.wait(function(error, data) {
      if (error) {
        return fn_generated(error, null);
      }

      var contents  = null,
          namespace = path.parse(file.path).name;

      try {
        contents = jade.compileClient(
          data.toString(),

          {
            compileDebug : false
          }
        ).toString();
      } catch (_error) {
        return fn_generated(_error, null);
      }

      return fn_generated(null, (
        "JST['" + namespace + "'] = " + contents + ";\n"
      ));
    })
  );
};
