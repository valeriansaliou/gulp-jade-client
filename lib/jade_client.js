/*
 * gulp-jade-client
 * Based on two-n/grunt-jade-client
 *
 * Copyright 2016, Valerian Saliou
 * Author: Valerian Saliou <valerian@valeriansaliou.name>
 */


"use strict";


var path  = require("path");

var jade  = require("jade");


exports.generate = function(file, opts) {
  var namespace = path.parse(file.path).name;

  var contents  = jade.compileClient(
    file.contents.toString(),

    {
      filename     : file.path,
      compileDebug : false,
      doctype: "html"
    }
  );

  return (
    new Buffer(opts.container + "[\"" + namespace + "\"] = " + contents + ";\n")
  );
};
