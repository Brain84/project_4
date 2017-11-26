module.exports = function (grunt, options) {
  return {
    options: {
        jshintrc: '.jshintrc',
        force: true
    },
    default: {
      files: [{
        src: ['<%= paths.dist %>/**/*.js', '!<%= paths.dist %>/**/vendor/**/*.js'],
        filter: require('../lib/filter')(grunt).exists([grunt.config('config.paths.app')])
      }],
    }
  };
};
