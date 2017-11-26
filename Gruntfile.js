
'use strict';

var path = require('path');
var _ = require('underscore');

// HTMLlint Java 'Unexpected token' issue workaround
if(process.env.JAVA_TOOL_OPTIONS) {
  delete process.env.JAVA_TOOL_OPTIONS;
}

module.exports = function(grunt) {
  grunt.config.set('config.debug', !grunt.option('production'));

  // Load helper for configurating task files
  grunt.getBuildFiles = require('./grunt/lib/get-build-files')(grunt);

  // Load helper for configurating tasks
  grunt.loadGruntConfig = require('./grunt/lib/load-grunt-config')(grunt);

  /**
   * Initialization
   */
  // Time how long tasks take.
  // Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load configurable files
  grunt.file.recurse('grunt/config', function(abspath, rootdir, subdir, filename) {
    grunt.config.merge({ config: grunt.file.readJSON(abspath) });
  });

  // Load the grunt config
  this.loadGruntConfig();

  /**
   * Tasks
   */
  grunt.registerTask('install', [
  ]);

  grunt.registerTask('default', [
    'install',
    'compile',
    'concurrent',
  ]);

  grunt.registerTask('compile', [

   // 'flayup',
    'clean',
    'copyto',
    'template',

    'compass:dist',

    'compass:dist',
    'bowercopy'

  ]);

  grunt.registerTask('build', [
    'install',
    'compile',
    'test',
    'production', // Triggers deploy if --production flag is set
  ]);

  grunt.registerTask('deploy', [
    'htmlbuild',
    'compress',
  ]);

  grunt.registerTask('test', [
    'csslint',
    'jshint',
    'htmllint',
  ]);



  // Load deploy tasks
  require('./grunt/lib/deploy-tasks')(grunt);

  /**
   * Reloads the grunt configuration
   */
  grunt.registerTask('reload_config', 'Reload the grunt config', function() {
    grunt.loadGruntConfig();
  });
};
