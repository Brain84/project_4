module.exports = function (grunt, options) {
  return {
    options: {
        csslintrc: '.csslintrc'
    },
    default: {
      files: [{
        src: ['<%= paths.dist %>/**/*.css', '!<%= paths.dist %>/**/vendor/**/*.css'],
        filter: require('../lib/filter')(grunt).exists([grunt.config('config.paths.app')])
      }],
    }
  };
};
