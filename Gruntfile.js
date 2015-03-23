
'use strict';
/*
 * lambda template
 * https://github.com/k-kinzal/lambda-template
 *
 * Copyright (c) 2015 k-kinzal
 * Licensed under the MIT license.
 */
module.exports = function (grunt) {
  // configuration
  var config = grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'src/*.js'
      ]
    },
    jasmine_node: {
      all: ['test/']
    }
  });
  // tasks
  grunt.registerTask('test', function() {
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jasmine-node'); 
    grunt.task.run([
      'jshint',
      'jasmine_node'
    ]);
  });
};




